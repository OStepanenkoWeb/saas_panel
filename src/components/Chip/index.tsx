import React from "react";
import { ILabel } from "../../pages/Kanban/Interfaces/IKanban";
import {MdOutlineClose} from "react-icons/md";
interface ChipProps {
    item: ILabel;
    removeLabel?: (label: ILabel) => void;
}
export default function Chip(props: ChipProps) {
    const { item, removeLabel } = props;
    return (
        <label style={{ backgroundColor: item.color, color: "#fff" }}>
            {item.text}
            {removeLabel && <MdOutlineClose onClick={() => removeLabel(item)} />}
        </label>
    );
}