/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
		currentPopup = WA.ui.openPopup("welcomePopup", "Bienvenue au casting by Holidée \r \r La présentation se déroulera en visio principalement sur la terrasse \r \r Un membre de la Team Holidée va venir t'accueillir \r \r Sinon, pour te rendre directement sur la terrasse, clique sur ce bouton :", [{
			label: "MARCHER VERS LA TERRASSE",
			className: "primary",
			callback: () => {
				WA.player.moveTo(1248, 672, 10);
		}
		}]);
    WA.room.area.onLeave('welcome').subscribe(closePopup);

	WA.room.area.onEnter('welcome').subscribe(() => {
		currentPopup = WA.ui.openPopup("welcomePopup", "Bienvenue au casting by Holidée \r \r La présentation se déroulera en visio principalement sur la terrasse \r \r Pour te rendre directement sur la terrasse, clique sur ce bouton :", [{
			label: "MARCHER VERS LA TERRASSE",
			className: "primary",
			callback: () => {
				WA.player.moveTo(1248, 672, 10);
		}
		}]);
	});
	
    WA.room.area.onLeave('welcome').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
