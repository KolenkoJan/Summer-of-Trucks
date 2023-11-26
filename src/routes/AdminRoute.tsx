import { observer } from "mobx-react-lite"
import { Button } from "../components"
import { useState } from "react"
import { TodosStore } from "../stores"

export const AdminRoute: React.FC = observer(() => {
    const [todosStore] = useState(() => new TodosStore())

    return (
        <div className="route-admin">
            <h3>H3 title</h3>
            <p>Paragraph text</p>
            <p>
                <strong>Paragraph text bold</strong> and now its not
            </p>
            <Button onClick={() => (todosStore.toggle = !todosStore.toggle)}>Toggle {`${todosStore.toggle}`}</Button>
            <p>{JSON.stringify(todosStore.todos)}</p>
        </div>
    )
})
