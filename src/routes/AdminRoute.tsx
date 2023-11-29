import { observer } from "mobx-react-lite"
import { Button } from "../components"
import { useState } from "react"
import { TodosStore } from "../stores"
import { Avatar } from "@src/components/avatar/Avatar"
import { Text } from "@src/components/typography/Text"
import { TextField } from "@src/components/Inputs/TextField"


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
            <Avatar
                source="https://s3-alpha-sig.figma.com/img/36d9/95b4/6b1cc8fee1e10ffb7ba71aab042d4c3f?Expires=1702252800&Signature=KU6lpcRRtsKkMB56goA2AhZsoJOqVbfMslSc7W0iiTPe1cw1K7uDYvD~fHCBD2uacFNjOQJoQp1rMfAnKtSo35OJicfk3qRbZ87gof9RzQbAnBlT~5Nabz4VGqIRqzkFB9s30WHSdjN33Wmm4oUrgQVw~tzMmfzR2PZK5NXrIIJMqtxZZ8Bu0W2ss~Q1rb2S7R6691JXSKnUAhw58Bz6Ts40QVhTeHQwUhLXxVeqBSS7iKSamN2TPlLv6mf7jcQYc9hnvlNHsCh7xJXwaVXCii~tTgzkxfOzeQq-hIlzppe5-uqPqejcfZyLEmRfppsTUyOtH4vbewDJZ23uoOoD7g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <Text variant="title-l"><strong>Title-l</strong></Text>
            <Text variant="body-m"><strong>Body-m</strong></Text>
            <Text variant="body-s">Body-s</Text>
            <TextField onChange={(value) => console.log(value)} placeholder="Enter number" type="number"/>
            <TextField onChange={(value) => console.log(value)} placeholder="Search"/>
            <TextField onChange={(value => console.log(value))} type="date"/>
            <TextField type="file"/>
        </div>
    )
})
