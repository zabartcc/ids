const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	"ipc", {
		send: (channel, data) => {
			let validChannels = ["loadPdfWindow"];
			if(validChannels.includes(channel)) {
				ipcRenderer.send(channel, data);
			}
		}
	}
)