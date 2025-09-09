import type { JSX } from "react";


function addLi(value: string):JSX.Element{
    return (
        <li>
            {value}
        </li>
    )
}

export default function Information(data: T[], type: string):JSX.Element {
    const result: JSX.Element[] = [];
    for(const info of data){
        result.push(addLi(info[type]));
    }
     return (
        <section>
            <ul>
                {result}
            </ul>
        </section>
     )

}