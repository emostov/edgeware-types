import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';

import { Mainnet } from '@edgeware/node-types';

async function main(): Promise<void>  {

	const api = await ApiPromise.create({
		provider: new WsProvider("ws://127.0.0.1:9944"),
		...Mainnet,
	});

	// This query for events works fine
	const events = await api.query.system.events();
	events.forEach((record) => {
		const { event, phase } = record;
		console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
	})


	// None of these work. They all get an error indicating the module is undefine.
	// e.g `TypeError: Cannot read property 'maxPending' of undefined`
	console.log(api.consts.proxy.maxPending);
	console.log(api.consts.babe.epochDuration);
	console.log(api.consts.system.extrinsicBaseWeight);
};

main().catch(console.log)