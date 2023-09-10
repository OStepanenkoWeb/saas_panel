import React, {KeyboardEvent, useEffect, useState} from "react";
import { colorsList } from "../../../pages/Kanban/Helper/Utils";
import Modal from "../../Modal/index";

import "./CardInfo.css";
import { ICard, ILabel, ITask } from "../../../pages/Kanban/Interfaces/IKanban";
import Chip from "../../Chip/index";
import {MdBloodtype, MdCheck, MdPermContactCalendar, MdRestoreFromTrash, MdTag, MdViewList} from "react-icons/md";
import {Input, TextField} from "@mui/material";
interface CardInfoProps {
    onClose: () => void;
    card: ICard;
    boardId: number;
    updateCard: (boardId: number, cardId: number, card: ICard) => void;
}
function CardInfo(props: CardInfoProps) {
    const { onClose, card, boardId, updateCard } = props;
    const [selectedColor, setSelectedColor] = useState("");
    const [textTask, setTextTask] = useState("");
    const [label, setLabel] = useState("");
    const [cardValues, setCardValues] = useState<ICard>({
        ...card,
    });

    const updateTitle = (value: React.ChangeEvent<HTMLInputElement>) => {
        setCardValues({ ...cardValues, title: value.target.value });
    };

    const updateDesc = (value: React.ChangeEvent<HTMLInputElement>) => {
        setCardValues({ ...cardValues, desc: value.target.value });
    };

    const handleKeyDownLabel = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.code === "Enter") {
            addLabel({color: selectedColor, text: label})
            setTextTask('')
        }

    }

    const handleKeyDownTask = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.code === "Enter") {
            addTask(textTask)
            setLabel('')
        }

    }

    const addLabel = (label: ILabel) => {
        const index = cardValues.labels.findIndex(
            (item) => item.text === label.text,
        );
        if (index > -1) return; //if label text already exist then return

        setSelectedColor("");
        setCardValues({
            ...cardValues,
            labels: [...cardValues.labels, label],
        });
    };

    const removeLabel = (label: ILabel) => {
        const tempLabels = cardValues.labels.filter(
            (item) => item.text !== label.text,
        );

        setCardValues({
            ...cardValues,
            labels: tempLabels,
        });
    };

    const addTask = (text: string) => {
        const task: ITask = {
            id: Date.now() + Math.random() * 2,
            completed: false,
            text,
        };
        setCardValues({
            ...cardValues,
            tasks: [...cardValues.tasks, task],
        });
    };

    const removeTask = (id: number) => {
        const tasks = [...cardValues.tasks];

        const tempTasks = tasks.filter((item) => item.id !== id);
        setCardValues({
            ...cardValues,
            tasks: tempTasks,
        });
    };

    const updateLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value)
    }

    const updateTask = (id: number, value: boolean) => {
        const tasks = [...cardValues.tasks];

        const index = tasks.findIndex((item) => item.id === id);
        if (index < 0) return;

        tasks[index].completed = Boolean(value);

        setCardValues({
            ...cardValues,
            tasks,
        });
    };

    const calculatePercent = () => {
        if (!cardValues.tasks?.length) return 0;
        const completed = cardValues.tasks?.filter(
            (item) => item.completed,
        )?.length;
        return (completed / cardValues.tasks?.length) * 100;
    };

    const updateDate = (date: string) => {
        if (!date) return;

        setCardValues({
            ...cardValues,
            date,
        });
    };

    useEffect(() => {
        if (updateCard) updateCard(boardId, cardValues.id, cardValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardValues]);

    const calculatedPercent = calculatePercent();

    return (
        <Modal onClose={onClose}>
            <div className="cardinfo">
                <div className="cardinfo-box">
                    <div className="cardinfo-box-title">
                        <MdBloodtype />
                        <p>Заголовок</p>
                    </div>
                    <TextField
                        value={cardValues.title}
                        defaultValue={cardValues.title}
                        placeholder="Введите заголовок"
                        onSubmit={updateTitle}
                    />
                </div>

                <div className="cardinfo-box">
                    <div className="cardinfo-box-title">
                        <MdViewList />
                        <p>Описание</p>
                    </div>
                    <TextField
                        value={cardValues.desc}
                        defaultValue={cardValues.desc}
                        placeholder="Добавьте описание"
                        onChange={updateDesc}
                    />
                </div>

                <div className="cardinfo-box">
                    <div className="cardinfo-box-title">
                        <MdPermContactCalendar />
                        <p>Дата</p>
                    </div>
                    <input
                        type="date"
                        defaultValue={cardValues.date}
                        min={new Date().toISOString().substr(0, 10)}
                        onChange={(event) => updateDate(event.target.value)}
                    />
                </div>

                <div className="cardinfo-box">
                    <div className="cardinfo-box-title">
                        <MdTag />
                        <p>Метки</p>
                    </div>
                    <div className="cardinfo-box-labels">
                        {cardValues.labels?.map((item, index) => (
                            <Chip key={index} item={item} removeLabel={removeLabel} />
                        ))}
                    </div>
                    <ul>
                        {colorsList.map((item, index) => (
                            <li
                                key={index}
                                style={{ backgroundColor: item }}
                                className={selectedColor === item ? "li-active" : ""}
                                onClick={() => setSelectedColor(item)}
                            />
                        ))}
                    </ul>
                    <TextField
                        value={label}
                        placeholder="Добавьте метку"
                        onKeyDown={handleKeyDownLabel}
                        onChange={updateLabel}
                    />
                </div>

                <div className="cardinfo-box">
                    <div className="cardinfo-box-title">
                        <MdCheck />
                        <p>Задачи</p>
                    </div>
                    <div className="cardinfo-box-progress-bar">
                        <div
                            className="cardinfo-box-progress"
                            style={{
                                width: `${calculatedPercent}%`,
                                backgroundColor: calculatedPercent === 100 ? "limegreen" : "",
                            }}
                        />
                    </div>
                    <div className="cardinfo-box-task-list">
                        {cardValues.tasks?.map((item) => (
                            <div key={item.id} className="cardinfo-box-task-checkbox">
                                <input
                                    type="checkbox"
                                    defaultChecked={item.completed}
                                    onChange={(event) =>
                                        updateTask(item.id, event.target.checked)
                                    }
                                />
                                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                                <MdRestoreFromTrash onClick={() => removeTask(item.id)} />
                            </div>
                        ))}
                    </div>
                    <TextField
                        value={textTask}
                        placeholder="Добавьте задачу"
                        onKeyDown={handleKeyDownTask}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTextTask(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default CardInfo;