/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		// Handle CORS preflight requests
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type",
				},
			});
		}

		if (request.method === "POST") {
			try {
				const { token } = await request.json();
				const secret = env.RECAPTCHA_SECRET;

				if (!token) {
					return new Response(JSON.stringify({ success: false, error: "Missing token" }), {
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						},
					});
				}

				const response = await fetch(
					`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
					{ method: "POST" }
				);

				const data = await response.json();
				console.log("reCAPTCHA response:", data); // DEBUG LOG

				if (!data.success || data.score < 0.5) {
					console.log("Verification failed. Score:", data.score);
				}

				return new Response(JSON.stringify(data), {
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					},
				});
			} catch (error) {
				return new Response(JSON.stringify({ success: false, error: error.message }), {
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					},
				});
			}
		}

		return new Response("Method not allowed", { status: 405 });
	},
};
