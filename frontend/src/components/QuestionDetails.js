import { useNavigate } from "react-router-dom"
import { useQuestionContext } from "../hooks/useQuestionContext"
import UpdateQuestionForm from "./UpdateQuestionForm"
import { useState } from "react"

const QuestionDetails = ({ question }) => {
    
    const { dispatch } = useQuestionContext()
    const [showForm, setShowForm] = useState(false)

    const deleteQuestion = async () => {
        const response = await fetch("http://localhost:4000/api/questions/" + question._id, {
            method: "DELETE"
        })
        const json = await response.json()
        
        if(response.ok){
            dispatch({type: "DELETE_QUESTIONS", payload: json})
        }

    }
    const editQuestion = () => {
        setShowForm(!showForm)
    }
    
    return (
        <div className="question-details">
            <h4>{question?.question}</h4>
            <p><strong>Options: </strong>{question?.options?.toString()}</p>
            <p><strong>Answer(s): </strong>{question?.answers?.toString()}</p>
            <span onClick={deleteQuestion}>delete</span>
            <p><strong>{question?.questionType}</strong></p>
            <div>
            <input type="submit" className="edit" value= {showForm ? "Hide" : "Edit"} onClick={editQuestion} />
            { showForm ? <UpdateQuestionForm question = {question} setShowForm={setShowForm}/> : null }
            </div>
        </div>
    )
} 

export default QuestionDetails