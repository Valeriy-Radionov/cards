import React from 'react'
import {CardType} from "../../../api/cards/cards-api";
import style from './Question.module.scss'


type QuestionPropsType = {
    card: CardType | null,
    gotCardsInDeck: boolean
}

export const Question: React.FC<QuestionPropsType> = (props) => {
    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.block}>
                    {props.gotCardsInDeck
                        ? <div className={style.question}>
                            <span><b>Question:</b></span>
                            {props.card?.questionImg ?
                                <div className={style.containerImg}><img src={props.card.questionImg}/></div> :
                                <span>{props.card && props.card.question}</span>
                            }
                        </div>
                        :
                        <span>No cards</span>
                    }
                </div>
            </div>
            <span className={style.attempts}>
                {props.card && `Number of answer attempts: ${props.card.shots}`}
            </span>

        </div>
    )
}