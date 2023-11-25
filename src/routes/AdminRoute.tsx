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
            <p className="bold">Paragraph text bold</p>
            <Button>Button outlined</Button>
            <p>{JSON.stringify(todosStore.todos)}</p>
        </div>
    )
})
