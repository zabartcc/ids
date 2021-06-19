const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	"ipc", {
		send: (channel, data) => {
			let validChannels = ["loadPdfWindow", "restartToUpdate"];
			if(validChannels.includes(channel)) {
				ipcRenderer.send(channel, data);
			}
		},
		onReceive: (channel, func) => {
			let validChannels = ["update"];
			if(validChannels.includes(channel)) {
				ipcRenderer.on(channel, (event, ...args) => func(...args));
			}
		}
	}
)