import React, { useState, KeyboardEvent } from "react";

import Card from "../CardBoard/index";
import Dropdown from "../Dropdown/index";

import "./Board.css";
import { IBoard, ICard } from "../../pages/Kanban/Interfaces/IKanban";
import {MdMoreHoriz} from "react-icons/md";
import {TextField} from "@mui/material";

interface BoardProps {
    board: IBoard;
    addCard: (boardId: number, title: string) => void;
    removeBoard: (boardId: number) => void;
    removeCard: (boardId: number, cardId: number) => void;
    onDragEnd: (boardId: number, cardId: number) => void;
    onDragEnter: (boardId: number, cardId: number) => void;
    updateCard: (boardId: number, cardId: number, card: ICard) => void;
    onDrop: (boardId: number) => void
    onDragStart: (boardId: number, cardId: number) => void;
}

function Board(props: BoardProps) {
    const {
        board,
        addCard,
        removeBoard,
        removeCard,
        onDragEnd,
        onDragEnter,
        updateCard,
        onDrop,
        onDragStart
    } = props;

    const [showDropdown, setShowDropdown] = useState(false);
    const [cardTitle, setCardTitle] = useState<string>('');

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.code === "Enter") {
            addCard(board?.id, cardTitle)
            updateNameCard('')
        }

    }

    const updateNameCard = (data: string) => {
        setCardTitle(data)
    }
    const onDropHandler = () => {
        onDrop(board.id)
    }

    return (
        <div className="board">
            <div className="board_inner" key={board?.id}>
                <div className="board_header">
                    <p className="board_header_title">
                        {board?.title}
                        <span>{board?.cards?.length || 0}</span>
                    </p>
                    <div
                        className="board_header_title_more"
                        onClick={() => setShowDropdown(true)}
                    >
                        <MdMoreHoriz/>
                        {showDropdown && (
                            <Dropdown
                                class="board_dropdown"
                                onClose={() => setShowDropdown(false)}
                            >
                                <p onClick={() => removeBoard(board?.id)}>Delete Board</p>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className="board_cards" onDrop={onDropHandler} onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}>
                    {board?.cards?.map((item) => (
                        <Card
                            key={item.id}
                            card={item}
                            boardId={board.id}
                            removeCard={removeCard}
                            onDragEnter={onDragEnter}
                            onDragEnd={onDragEnd}
                            updateCard={updateCard}
                            onDragStart={onDragStart}
                        />
                    ))}
                    <TextField
                        value={cardTitle}
                        placeholder="Название карточки"
                        onChange={(value: React.ChangeEvent<HTMLInputElement>) => updateNameCard(value.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}

export default Board;