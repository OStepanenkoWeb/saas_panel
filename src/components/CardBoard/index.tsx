import React, { useState } from "react";
import { formatDate } from "../../pages/Kanban/Helper/Utils";
import { ICard } from "../../pages/Kanban/Interfaces/IKanban";
import Chip from "../Chip/index";
import Dropdown from "../Dropdown/index";

import "./CardBoard.css";
import CardInfo from "./CardInfo/index";
import {MdCheck, MdFormatAlignLeft, MdMoreHoriz, MdPunchClock} from "react-icons/md";
interface CardProps {
    card: ICard;
    boardId: number;
    removeCard: (boardId: number, cardId: number) => void;
    onDragEnd: (boardId: number, cardId: number) => void;
    onDragEnter: (boardId: number, cardId: number) => void;
    updateCard: (boardId: number, cardId: number, card: ICard) => void;
    onDragStart: (boardId: number, cardId: number) => void;
}
function Card(props: CardProps) {
    const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard, onDragStart } =
        props;
    const { id, title, desc, date, tasks, labels } = card;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <CardInfo
                    onClose={() => setShowModal(false)}
                    card={card}
                    boardId={boardId}
                    updateCard={updateCard}
                />
            )}
            <div
                className="card"
                key={card.id}
                draggable
                onDragStart={() => onDragStart(boardId, id)}
                onDragEnd={() => onDragEnd(boardId, id)}
                onDragEnter={() => onDragEnter(boardId, id)}
                onClick={() => setShowModal(true)}
            >
                <div className="card-top">
                    <div className="card-top-labels">
                        {labels?.map((item, index) => (
                            <Chip key={index} item={item} />
                        ))}
                    </div>
                    <div
                        className="card-top-more"
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowDropdown(true);
                        }}
                    >
                        <MdMoreHoriz/>
                        {showDropdown && (
                            <Dropdown
                                class="board-dropdown"
                                onClose={() => setShowDropdown(false)}
                            >
                                <p onClick={() => removeCard(boardId, id)}>Delete Card</p>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className="card-title">{title}</div>
                <div>
                    <p title={desc}>
                        <MdFormatAlignLeft />
                    </p>
                </div>
                <div className="card-footer">
                    {date && (
                        <p className="card-footer-item">
                            <MdPunchClock className="card-footer-icon" />
                            {formatDate(date)}
                        </p>
                    )}
                    {tasks && tasks?.length > 0 && (
                        <p className="card-footer-item">
                            <MdCheck className="card-footer-icon" />
                            {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Card;