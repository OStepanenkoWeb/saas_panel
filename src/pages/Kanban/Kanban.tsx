import React, {FC, KeyboardEvent, useEffect, useState} from "react";
import Board from "../../components/Board/index";
import "./Kanban.css";
import { ICard, IBoard } from "./Interfaces/IKanban";
import { fetchBoardList, updateLocalStorageBoards } from "./Helper/APILayers";
import { InputAdornment, TextField} from "@mui/material";
import {MdAddCard} from "react-icons/md";

const Kanban:FC =() => {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [targetBoardId, setTargetBoardId] = useState<number>(0);
    const [boardTitle, setBoardTitle] = useState<string>('');
    const [startCard, setStartCard] = useState({
        boardId: 0,
        cardId: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const boards: IBoard[] = await fetchBoardList();
        setBoards(boards);
    }
    const [targetCard, setTargetCard] = useState({
        boardId: 0,
        cardId: 0,
    });

    const updateBoardTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(event.target.value)
    }

    const addboardHandler = (name: string) => {
        const tempBoardsList = [...boards];
        tempBoardsList.push({
            id: Date.now() + Math.random() * 2,
            title: name,
            cards: [],
        });
        setBoards(tempBoardsList);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.code === "Enter") {
            addboardHandler(boardTitle)
            setBoardTitle('')
        }

    }

    const removeBoard = (boardId: number) => {
        const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
        if (boardIndex < 0) return;

        const tempBoardsList = [...boards];
        tempBoardsList.splice(boardIndex, 1);
        setBoards(tempBoardsList);
    };

    const addCardHandler = (boardId: number, title: string) => {
        const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
        if (boardIndex < 0) return;

        const tempBoardsList = [...boards];
        tempBoardsList[boardIndex].cards.push({
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: "",
            tasks: [],
            desc: "",
        });
        setBoards(tempBoardsList);
    };

    const removeCard = (boardId: number, cardId: number) => {
        const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
        if (boardIndex < 0) return;

        const tempBoardsList = [...boards];
        const cards = tempBoardsList[boardIndex].cards;

        const cardIndex = cards.findIndex((item) => item.id === cardId);
        if (cardIndex < 0) return;

        cards.splice(cardIndex, 1);
        setBoards(tempBoardsList);
    };

    const updateCard = (boardId: number, cardId: number, card: ICard) => {
        const boardIndex = boards.findIndex((item) => item.id === boardId);
        if (boardIndex < 0) return;

        const tempBoardsList = [...boards];
        const cards = tempBoardsList[boardIndex].cards;

        const cardIndex = cards.findIndex((item) => item.id === cardId);
        if (cardIndex < 0) return;

        tempBoardsList[boardIndex].cards[cardIndex] = card;

        setBoards(tempBoardsList);
    };

    const onDragStart = (boardId: number, cardId: number) => {
        setStartCard({boardId, cardId})
    }

    const onDrop = (boardId: number) => {
        const { cardId, boardId: boardIdStart} = startCard

        setTargetBoardId(boardId)
        onDragEnd(boardIdStart, cardId)
    }

    const onDragEnd = (boardId: number, cardId: number) => {
        const sourceBoardIndex = boards.findIndex(
            (item: IBoard) => item.id === boardId,
        );

        if (sourceBoardIndex < 0) return;

        const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
            (item) => item.id === cardId,
        );

        if (sourceCardIndex < 0) return;

        const targetBoardIndex = boards.findIndex(
            (item: IBoard) => item.id === targetBoardId,
        );

        if (targetBoardIndex < 0) return;

        let targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
            (item) => item.id === targetCard.cardId,
        );

        if (targetCardIndex < 0) {
            targetCardIndex = targetCard.cardId;
        }
        const tempBoardsList = [...boards];
        const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];

        tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
        tempBoardsList[targetBoardIndex].cards.splice(
            targetCardIndex,
            0,
            sourceCard,
        );
        setBoards(tempBoardsList);

        setTargetCard({
            boardId: 0,
            cardId: 0,
        });
    };

    const onDragEnter = (boardId: number, cardId: number) => {
        if (targetCard.cardId === cardId) return;

        setTargetCard({
            boardId: boardId,
            cardId: cardId,
        });
    };

    useEffect(() => {
        updateLocalStorageBoards(boards);
    }, [boards]);
    return (
        <div className="app">
            <div className="app-nav">
                <h1>Kanban Board</h1>
            </div>
            <div className="app-boards-container">
                <div className="app-boards">
                    {boards.map((item) => (
                        <Board
                            key={item.id}
                            board={item}
                            addCard={addCardHandler}
                            removeBoard={() => removeBoard(item.id)}
                            removeCard={removeCard}
                            onDragEnd={onDragEnd}
                            onDragEnter={onDragEnter}
                            updateCard={updateCard}
                            onDrop={onDrop}
                            onDragStart={onDragStart}
                        />
                    ))}
                    <div className="app-boards-last">
                        <TextField
                            value={boardTitle}
                            placeholder="Введите название доски"
                            onChange={updateBoardTitle}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MdAddCard />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Kanban;