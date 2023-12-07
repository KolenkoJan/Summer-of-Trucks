import { observer } from "mobx-react-lite"
import { Button } from "../components"
import { Text } from "../components/typography/Text"
import { CheckBox } from "../components/Inputs/checkbox/CheckBox"
import { TextField } from "../components/Inputs/textField/TextField"
import { Avatar } from "../components/avatar/Avatar"
import { useState } from "react"
import { Switch } from "../components/Inputs/switch/Switch"
import { Table } from "../components/tables/Table"

export const AdminRoute: React.FC = observer(() => {
    const [checked, setChecked] = useState<boolean>(false)
    const [checkedSwitch, isCheckedSwitch] = useState<boolean>(false)

    return (
        <div className="route-admin">
            <Text variant="title-l">
                <strong>Title-l</strong>
            </Text>
            <Text variant="body-m">
                <strong>Body-m</strong>
            </Text>
            <Text variant="body-s">Body-s</Text>
            <Button
                leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                }
            >
                BUTTON
            </Button>
            <Button>TEST</Button>
            <Avatar source="https://s3-alpha-sig.figma.com/img/36d9/95b4/6b1cc8fee1e10ffb7ba71aab042d4c3f?Expires=1702252800&Signature=KU6lpcRRtsKkMB56goA2AhZsoJOqVbfMslSc7W0iiTPe1cw1K7uDYvD~fHCBD2uacFNjOQJoQp1rMfAnKtSo35OJicfk3qRbZ87gof9RzQbAnBlT~5Nabz4VGqIRqzkFB9s30WHSdjN33Wmm4oUrgQVw~tzMmfzR2PZK5NXrIIJMqtxZZ8Bu0W2ss~Q1rb2S7R6691JXSKnUAhw58Bz6Ts40QVhTeHQwUhLXxVeqBSS7iKSamN2TPlLv6mf7jcQYc9hnvlNHsCh7xJXwaVXCii~tTgzkxfOzeQq-hIlzppe5-uqPqejcfZyLEmRfppsTUyOtH4vbewDJZ23uoOoD7g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
            <TextField onChange={(value) => console.log(value)} placeholder="Enter number" type="number" />
            <TextField onChange={(value) => console.log(value)} placeholder="Search" type="text" />
            <TextField onChange={(value) => console.log(value)} type="date" />
            <TextField onChange={(value) => console.log(value)} type="text" placeholder="Outlined" />
            <CheckBox
                label="Label"
                onChange={(isChecked) => {
                    setChecked(isChecked)
                }}
                isChecked={checked}
            />
            <Switch label="Required" onChange={(isChecked) => isCheckedSwitch(isChecked)} isChecked={checkedSwitch} />
            <Table>
                <tr>
                    <th>Dessert (100g serving)</th>
                    <th>Calories</th>
                    <th>Fat(g)</th>
                    <th>Carbs(g)</th>
                    <th>Protein(g)</th>
                </tr>
                <tr>
                    <td>Frozen yoghurt</td>
                    <td>159</td>
                    <td>6</td>
                    <td>24</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>Ice cream sandwich</td>
                    <td>237</td>
                    <td>9</td>
                    <td>37</td>
                    <td>4.3</td>
                </tr>
                <tr>
                    <td>Eclair</td>
                    <td>262</td>
                    <td>16</td>
                    <td>24</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>Cupcake</td>
                    <td>305</td>
                    <td>3.7</td>
                    <td>67</td>
                    <td>4.3</td>
                </tr>
                <tr>
                    <td>Gingerbread</td>
                    <td>356</td>
                    <td>16</td>
                    <td>49</td>
                    <td>3.9</td>
                </tr>
            </Table>
        </div>
    )
})
