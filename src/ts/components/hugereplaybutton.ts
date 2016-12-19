/*
 * Copyright (C) 2016, bitmovin GmbH, All Rights Reserved
 *
 * Authors: Mario Guggenberger <mario.guggenberger@bitmovin.com>
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 */

import {ButtonConfig, Button} from "./button";
import {DOM} from "../dom";
import {UIManager} from "../uimanager";
import PlayerEvent = bitmovin.player.PlayerEvent;

/**
 * A button to play/replay a video.
 */
export class HugeReplayButton extends Button<ButtonConfig> {

    constructor(config: ButtonConfig = {}) {
        super(config);

        this.config = this.mergeConfig(config, {
            cssClass: "ui-hugereplaybutton",
            text: "Replay"
        }, this.config);
    }

    configure(player: bitmovin.player.Player, uimanager: UIManager): void {
        super.configure(player, uimanager);

        this.onClick.subscribe(function () {
            player.play();
        });
    }

    protected toDomElement(): DOM {
        let buttonElement = super.toDomElement();

        // Add child that contains the play button image
        // Setting the image directly on the button does not work together with scaling animations, because the button
        // can cover the whole video player are and scaling would extend it beyond. By adding an inner element, confined
        // to the size if the image, it can scale inside the player without overshooting.
        buttonElement.append(new DOM("div", {
            "class": this.prefixCss("image")
        }));

        return buttonElement;
    }
}