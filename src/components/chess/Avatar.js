import { useContext, useState } from "react";
import { GameContext, useChessContext } from "./context";

const Avatar = (props) => {
    const gameContext = useChessContext();    

    function getName() {
        return props.avatar ? props.avatar : gameContext.avatar;
    }

    function getMoveClue() {
        return !props.skill && gameContext.moveClue;
    }

    function getSkill() {
        if (props && (typeof props.skill === 'undefined'))
            return gameContext.skillLevel;
        else
            return props.skill;
    }

    function getEngine() {
        return props.engine || gameContext.engine;
    }

    function getClass() {
        return props.selected ? "avatar selected" : "avatar";
    }

    function handleClick() {        
        if (props && (props.engine || props.skill || props.avatar)) {
            gameContext.setEngine(props.engine);
            gameContext.setSkillLevel(props.skill);
            gameContext.setAvatar(props.avatar);
            gameContext.setBackStory(props.backstory);
        }
        props.onClick(props);
    }

    return (        
        <div className={getClass()} onClick={handleClick} key={getName()}>
            <img className="avataricon" src={getName() + ".jpg"} alt="avatar" />
            <div className="avatarinfo">
                {getName()}
                <div className="skill">{getMoveClue()} {getSkill()}</div>
            </div>
        </div>
    )

}

export default Avatar;