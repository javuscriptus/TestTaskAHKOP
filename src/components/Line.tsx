import React, { Dispatch, SetStateAction } from "react";
import { Region } from "../server-mock";
import Arrow from "../icons/arrow-right.svg";
import Object from "../icons/object.svg";
import "./Line.css";

interface Props {
    elems: Region[];
    opened: number[];
    setOpened: Dispatch<SetStateAction<number[]>>;
    indexNumber: number;
    id?: number;
}

export const Line: React.FC<Props> = (props) => {
    const { elems, indexNumber, setOpened, opened, id } = props;

    const parsedPaths = elems.filter((elem) => {
        const splitElems = elem.path.split(".");
        return (
            splitElems.length === indexNumber + 1 &&
            (id ? Number(splitElems[indexNumber - 1]) === id : true)
        );
    });

    function onClickHandler() {
        setOpened((prev) =>
            isOpened
                ? prev.filter((elem) => elem !== id)
                : typeof id === "number"
                    ? [...prev, id]
                    : prev
        );
    }

    const elem = elems.find((elem) => elem.id === id);
    const isRoot = typeof id !== "number";
    const isOpened = Boolean(isRoot || opened.find((elem) => elem === id));

    return (
        <div
            className="line"
            style={{
                borderLeft:
                    isRoot || parsedPaths[0]?.path?.split(".")?.length === 2
                        ? "none"
                        : undefined,
            }}
        >
            {!isRoot && (
                <div onClick={onClickHandler}>
                    <Arrow className={isOpened ? `arrow open` : `arrow close`}/>
                    <Object className="object"/>
                    {elem?.name}
                </div>
            )}
            {isOpened &&
                parsedPaths.map((elem) => (
                    <Line
                        key={elem.id}
                        id={elem.id}
                        elems={elems}
                        opened={opened}
                        setOpened={setOpened}
                        indexNumber={indexNumber + 1}
                    />
                ))}
        </div>
    );
};