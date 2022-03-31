package application.rest;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

@Path("/")
public class RootEndpoint {

	private static Logger logger = Logger.getLogger(RootEndpoint.class.getName());
	private static Properties props = new Properties();

	static {
		try {
			ClassLoader classLoader = RootEndpoint.class.getClassLoader();
			InputStream input = classLoader.getResourceAsStream("verify.config");
			props.load(input);
		} catch (IOException e) {
			logger.log(Level.SEVERE, "Error loading Security Verify configuration.");
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response listResources(@Context UriInfo uriInfo) {
		String healthURL = (uriInfo.getAbsolutePath() + "/health").replaceAll("(?<!http:)\\/\\/", "/");
		String exampleURL = (uriInfo.getAbsolutePath() + "/v1/example").replaceAll("(?<!http:)\\/\\/", "/");
		return Response.ok("{\"health\":\"" + healthURL + "\",\"example\":\"" + exampleURL + "\"}").build();
	}

	@GET
	@Produces({ MediaType.TEXT_HTML })
	public InputStream getIndex() {
		try {
			return this.getClass().getResourceAsStream("/index.html");
		} catch (Exception e) {
			throw new RuntimeException("Exception returning index.html", e);
		}
	}

	@GET
	@Path("userinfo")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserInfo(@javax.ws.rs.core.Context javax.servlet.http.HttpServletRequest request) {
		final String authorizationHeaderValue = request.getHeader("Authorization");
		String token = null;
		if (authorizationHeaderValue != null && authorizationHeaderValue.startsWith("Bearer")) {
			token = authorizationHeaderValue.substring(7, authorizationHeaderValue.length());
		}

		JSONObject tokenIntro = null;

		if (token == null) {
			logger.log(Level.SEVERE, "No token found!");
			tokenIntro = new JSONObject();
			tokenIntro.put("error", "No user found!");
		}

		try {

			if (token != null) {
				HttpPost post = new HttpPost(props.getProperty("introspectionUrl"));
				List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
				urlParameters.add(new BasicNameValuePair("client_id", props.getProperty("clientId")));
				urlParameters.add(new BasicNameValuePair("client_secret", props.getProperty("clientSecret")));
				urlParameters.add(new BasicNameValuePair("token", token));

				post.setEntity(new UrlEncodedFormEntity(urlParameters));
				String result = "";
				try (CloseableHttpClient httpClient = HttpClients.createDefault();
						CloseableHttpResponse res = httpClient.execute(post)) {
					result = EntityUtils.toString(res.getEntity());
					logger.log(Level.INFO, "Token introspection results:" + result);
					tokenIntro = new JSONObject(result);
					if (tokenIntro.getBoolean("active") == false) {
						tokenIntro.put("error", "No user found!");
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.log(Level.SEVERE, e.getMessage());
			tokenIntro = new JSONObject();
			tokenIntro.put("error", "No user found!");
			Response.ok(tokenIntro.toString()).build();
		}
		return Response.ok(tokenIntro.toString()).build();
	}
}
