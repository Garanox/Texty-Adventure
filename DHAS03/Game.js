const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    CELL: Symbol("look"),
    ESCAPECELL: Symbol("wait"),
    THEROOMBELOW: Symbol("forward"),
    END: Symbol("end"),
    BURNORLEAVE: Symbol("decide"),
    SNEAKAWAY: Symbol("sneak"),
    SHADOWMAGE: Symbol("mage"),
    FINALSHOWDOWN: Symbol("last"),
    THEWAYOUT: Symbol("out")

});

export default class Game {
    constructor() {
        //variables
        this.hasKey = false;
        this.sleepingGuard = false;
        this.hasMagic = false;
        this.doorOpen = false;
        this.talkingKing = false;

        this.stateCur = GameState.WELCOMING;
    }

    makeAMove(sInput) {
        let sReply = "";
        switch (this.stateCur) {
            case GameState.WELCOMING:
                sReply = "You are a practicer of the Arcane arts, an uncommon thing in your city," +
                    "though you are a novice you strive to better your skills. However the prince from your city suddenly vanishes one night." +
                    "The king declairs that magic was used to steal the prince away, and you being the only practitoner of Arcane arts are arrsted on suspisson" +
                    "Your hands are locked with Arcane manacles that prevent your magic from working." + "You are then taken to the Black Tower that evening. In three days your fate will be decided should no evidence come forth." +
                    "You are thrown uncerimoniusly into a cell on the higest floor of the 100 foot tall Black Tower, the iron bar door swings shut and is locked by a tired looking guard" +
                    "You're not sure if anyone will even look for your innocence in the 3 day time...Look around the room for a way out";
                this.stateCur = GameState.CELL;
                break;
            case GameState.CELL:
                if (sInput.toLowerCase().match("look")) {
                    sReply = "You're in a dark and dirty cell, you can hear the wind howling outside and the occassonal yawn of the guard sitting outside your cell." +
                        "The Guard has a set of keys hanging from a hook on his belt.";
                }

                //haha i'm so funny
                else if (sInput.toLowerCase().match("escape")) {
                    sReply = "One can only hope you do";
                }

                else if (sInput.toLowerCase().match("key") && this.sleepingGuard === false) {
                    sReply = "You take a look at the keys hanging on the belt hook, The guards sudden yawn catches you off guard." +
                        "You were always good at huming";
                }

                else if (sInput.toLowerCase().match("magic") && this.hasMagic === false) {
                    sReply = "as you try and summon your well of arcane power the violet runes glow bright and you feel a sudden pain in the back of your mind." +
                        "There has to be a way to get these things off...";
                }

                else if (sInput.toLowerCase().match("hum") && this.sleepingGuard === false) {
                    sReply = "you softly sing a lovely tune, the guard begins to nod off as you continue...Untill he eventualy falls asleep" +
                        ",slumped over in his chair. His keys are within reach, do you take the keys?";
                    this.sleepingGuard = true;
                }

                else if (sInput.toLowerCase().match("key") && this.sleepingGuard === true) {
                    sReply = "You quickly take the keys from the sleeping guard, there are a variety of keys on the loop. One of them has to open the cell, and your chains. Do you open the door and remove the chains?";
                    this.hasKey = true;
                    this.stateCur = GameState.ESCAPECELL;
                }
                else {
                    sReply = "Maybe you should try looking around";
                }

                break;
            //-----------------------------------------------------------------------
            case GameState.ESCAPECELL:
                if (sInput.toLowerCase().match("open")) {
                    sReply = "you fit one of the keys into the lock and the door slowly swings into your cell. You also remove the chains that hold back your magic and you can leave";
                    this.hasMagic = true;
                }

                else if (sInput.toLowerCase().match("magic") && this.hasMagic === false) {
                    sReply = "as you try and summon your well of arcane power the violet runes glow bright and you feel a sudden pain in the back of your mind." +
                        "There has to be a way to get these things off...";
                }
                else if (sInput.toLowerCase().match("magic") && this.hasMagic === true) {
                    sReply = "You remember you have a few spells you can use: sleep, control fire(create small harmless flames or extinguish small fires)";
                }
                else if (sInput.toLowerCase().match("leave")) {
                    sReply = "You head down the dark hallway, the odd torch lighting the long hallways. You try and keep to the shadows and start to take notice of the lack of guards, or prisonerrs in the tower." +
                        "you begin to head down the stair case trying to keep quiet, you suddenly hear voices in the room below you and can make out shadows from the torch light. What to do now...they have not seen you yet..." +
                        " You could attack them, or run for it, you could also use magic...";
                    this.stateCur = GameState.THEROOMBELOW;
                }
                else {
                    sReply = "Maybe you should try something else";
                }
                break;
            //---------------------------------------------
            case GameState.THEROOMBELOW:
                if (sInput.toLowerCase().match("attack")) {
                    sReply = "You use this moment to take the guards by surprise, tackling one to the ground before the other moves in to attack you." +
                        "You struggle with the one on the ground before you are stabbed in the back with a short sword. Everything goes dark" +
                        " Type restart if you want to try again";
                    this.stateCur = GameState.END;

                } else if (sInput.toLowerCase().match("magic") && this.hasMagic === true) {
                    sReply = "You remember you have a few spells you can use: sleep, control fire(create small harmless flames or extinguish small fires)";
                }

                else if (sInput.toLowerCase().match("control fire")) {
                    sReply = "you focus your power on the torches and snap your fingers, the torch light suddenly goes out. You hear two voices argue about the sudden darkness and hear a 3rd voice chime in" +
                        "They seem to be looking for a way to light the torches. Time to go while they can't see you" + "You head down the stairs till you arrive in another long hallway with cells, a few torches light the path and you see no guards at the moment" +
                        "You see an older man trying to get your attention with hand motions...do you talk to him?";
                    this.stateCur = GameState.SNEAKAWAY;


                }

                else if (sInput.toLowerCase().match("sleep")) {
                    sReply = "You speak quietly the sleep spell, centering it around the guards. You hear two people yawn and then the sudden thunk as their bodies hit the ground." +
                        "You hear a 3rd guard approch from the distance, muttering about lack of sleep and guards on shift. " + "You wait for the 3rd guard to try and wake his friends, you slip past him while he trys a a few ways to wake them up." +
                        "You head down the stairs till you arrive in another long hallway with cells, a few torches light the path and you see no guards at the moment" +
                        "You see an older man trying to get your attention with hand motions...do you talk to him?";
                    this.stateCur = GameState.SNEAKAWAY;
                }

                else if (sInput.toLowerCase().match("run")) {
                    sReply = "You make a run for it, hoping their armor weighs them down, you make it a few feet from the stairs before you are taken down by three guards." +
                        "You are brought back to your cell and  locked away again.";
                    this.hasKey = false;
                    this.sleepingGuard = false;
                    this.hasMagic = false;
                    this.doorOpen = false;
                    this.stateCur = GameState.CELL;
                }
                break;
            //--------------------------------------------------------------------------------------
            case GameState.SNEAKAWAY:
                if (sInput.toLowerCase().match("talk")) {
                    sReply = "You approch the cell with the old man in it. He looks like he has locked in here from some time." +
                        "The old man speaks quietly: -i am the king of this land, a wizard has taken my place and had me locked away. Get me out of here and i'll help you-" +
                        "this all seems odd, he looks like a very ratty imitation of the king...maybe he's just crazy...do you help him or leave?";
                    this.talkingKing = true;
                }
                else if (sInput.toLowerCase().match("help") && this.talkingKing === true) {
                    sReply = "You unlock the cell for the old king, he thanks you: --I wont forget this," +
                        "but i can't leave till i find my son. I know he's here.--" +
                        "His son? the prince? this could help clear your name. You follow the old king down the hall till you reach a dead end." +
                        "The old king presses a brink into the wall and a large room opens infront of you" +
                        "Inside the large room filled with books is a tall cloacked figure who speaks as you enter: " +
                        "--You will never free the prince! a punny novice like you cannot charm me! AHAHAHAHAH my shadow magic will strangle you both!--" +
                        "Shadows from objects in the torch lit room start moving towards you! time for some of your own magic...but sleep or control fire...";
                    this.stateCur = GameState.SHADOWMAGE;



                }

                else {

                    sReply = "you decided not to risk letting the crazy old man out. Besides, you have no idea when the next round of guards is. So you leave him in his cell." +
                        "You arrive at the bottom of the stairs and keep close to the wall. There are 4 guards around the room and one large lanturn in the center of the room..." +
                        "Do you use control fire to put out the lamp? or sleep the guards?";

                    this.stateCur = GameState.THEWAYOUT;
                }

                break;

            case GameState.SHADOWMAGE:
                if (sInput.toLowerCase().match("sleep")) {
                    sReply = "Not listening to a word the overconfident mage says you cast sleep on him just before you are hit with shadow magic." +
                        " .....but nothing happens! The mage laughs: --HAHAHAHA Your WEAK magic could never stop me! Everything goes dark as you're slowly choked out...." +
                        " Type restart if you want to try again";
                    this.stateCur = GameState.END;
                }
                else if (sInput.toLowerCase().match("control fire")) {
                    sReply = "You smirk at the overconfident mage and snap your fingers, all the torches go out. His laughter suddenly stops: --W-what, no! how did you-! ARGH! i can't see! where are you!--" +
                        "You feel the old king grab your arm: --good work, he has no shadow to work with now. Quickly! this way!--" +
                        "The old king leads you through the dark untill you reach another wall. He presses another brick in and you hear a passage open." +
                        " all the while the mage curses as he tries to relight the torches." + " You are lead down more stairs still you enter a room lit with magical stones." +
                        " there you see the prince, gaged and locked in a cell! and a table nearby with an open spellbook...The king rushes forwards, taking the keys from you and opens the cell door" +
                        "The prince speaks as soon as he is ungaged: --NO IT'S A TRAP FATHER! RUN!-- The shadow mage suddenly appears from on of the shadows on the ground and speaks: --FOOLS! now i shall be rid of all who know about my plot!" +
                        "No torches here for you now LITTLE NOVICE! DIE HAHAHAHAHA-- the shadows move in again! you glance down at the spell book, and then back to your own hands...Do you try sleep? or the spell book?";
                    this.stateCur = GameState.FINALSHOWDOWN;
                }

                break;
            case GameState.FINALSHOWDOWN:
                if (sInput.toLowerCase().match("spell book")) {
                    sReply = "You use the spell book, reading the first spell you see! You yell: --Imprisoning Chains!-- Suddenly etheral chains spring out of the ground around the shadow mage!" +
                        " The chains bind him and the shadows snap back to their normal shapes. The mage yells: --NO! HOW COULD A NOVICE LIKE YOU CAST SUCH A SPELL!" +
                        " Guards come rushing down the stairs and see the shadow mage bound and the prince pointing at him: --take him away! this mage has impersonated my father and accused this innocent mage of kidnapping me!" +
                        "The guards look confused for a moment, but then jump to attention and grab the mage... You are thanked for your assistance and lead out with the king and the prince. Your name is cleared and your given a job as the royal Arch Mage" +
                        " You've made it out and cleared your name! nice work! type: restart, to start again";
                    
                    this.stateCur = GameState.END;
                }
                else if (sInput.toLowerCase().match("sleep")) {
                    sReply = "You cast sleep on him just before you are hit with shadow magic." +
                        " .....but nothing happens! The mage laughs: --HAHAHAHA Your WEAK magic could never stop me! Everything goes dark as you're slowly choked out...." +
                        " Type restart if you want to try again";
                    this.stateCur = GameState.END;
                }
                else {
                    sReply = "The shadows close in! hurry up and decide!";
                }
                break;

            case GameState.THEWAYOUT:
                if (sInput.toLowerCase().match("sleep")) {
                    sReply = "You try and wait for the guards to line up for sleep to get them at once...The momemnt never happens, so you get 2 of them..." +
                        " As soon as they fall asleep one of the other guards shakes them awake before sleep is ready to be used again...Drat...";
                }
                else if (sInput.toLowerCase().match("control fire")) {
                    sReply = "you snap your fingers and the lanturn goes out. One of the guards grumbles about the oil level in the lanturn." +
                        "He then goes to relight it with a large jug of oil, you then cast sleep on him and the oil spills to the floor, quickly filling a large part of the room..." +
                        "two of the guards go over to wake him and slip on the oil... Do you make a run for it or light the oil on fire?";
                    this.stateCur = GameState.BURNORLEAVE;
                }
                else {
                    sReply = "You can't risk being caught now...pick a spell..";
                }
                break;
            case GameState.BURNORLEAVE:
                if (sInput.toLowerCase().match("run")) {
                    sReply = "You keep to the side of the room where the oil is not andd dash for the door! the fourth guard hears movment and trys to get to the door first, but slips!" +
                        "You push open the door and run out into the night... the guards give chase, but you lose them in the forest." +
                        " You may not have cleared your name, but atleast your not dead... A new life far from here awaits!" +
                        " You made it out! nice job,You can type: restart, if you want to try another path!";
                    
                    this.stateCur = GameState.END;
                }
                else if (sInput.toLowerCase().match("burn")) {
                    sReply = "With a snap of your fingers you set fire to the oil. It spreads fast and you can hear the guars yelling in pain!" +
                        " You make a dash for the door! the flames are hot and singe your clothes, but you make it out the door! you still hear the guards yelling as the bse of the tower catches fire" +
                        " They would have killed you anyway, you tell yourself...and head off into the dark woods before you... ready to start a new life...and burn those who would stop you..." +
                        " Wow, uhm..nice...job? you got out and burned the tower...type restart, if you want to start over!";
                    
                    this.stateCur = GameState.END;
                }

                break;

            case GameState.END:
                if (sInput.toLowerCase().match("restart")) {
                    sReply = "You are a practicer of the Arcane arts, an uncommon thing in your city," +
                        "though you are a novice you strive to better your skills. However the prince from your city suddenly vanishes one night." +
                        "The king declairs that magic was used to steal the prince away, and you being the only practitoner of Arcane arts are arrsted on suspisson" +
                        "Your hands are locked with Arcane manacles that prevent your magic from working." + "You are then taken to the Black Tower that evening. In three days your fate will be decided should no evidence come forth." +
                        "You are thrown uncerimoniusly into a cell on the higest floor of the 100 foot tall Black Tower, the iron bar door swings shut and is locked by a tired looking guard" +
                        "You're not sure if anyone will even look for your innocence in the 3 day time...";

                    this.hasKey = false;
                    this.sleepingGuard = false;
                    this.hasMagic = false;
                    this.doorOpen = false;
                    this.talkingKing = false;
                    this.stateCur = GameState.CELL;
                }
                else {
                    sReply = "type: restart";
                }
                break;
        }



        return ([sReply]);
    }
}