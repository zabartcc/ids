module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				"appId": "org.zabartcc.ids",
				"productName": "Albuquerque ARTCC IDS",
				"artifactName": "AlbuquerqueIDSInstall.${ext}",
				"win": {
					"publish": {
						"provider": "s3",
						"bucket": "ids",
						"endpoint": "https://cdn.zabartcc.org",
						"channel": "latest"
					}
				}
			}
		}
	}
  }