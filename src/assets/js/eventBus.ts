const Emitter  = require('tiny-emitter');
const emitter = new Emitter();

export default {
	$on: (...args: any[]): void => emitter.on(...args),
	$once: (...args: any[]): void => emitter.once(...args),
	$off: (...args: any[]): void => emitter.off(...args),
	$emit: (...args: any[]): void => emitter.emit(...args),
}