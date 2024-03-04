import { useQuestionContext } from "../hooks/useQuestionContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateQuestionForm from "./UpdateQuestionForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { QuestionContext } from "../context/QuestionContext"

const QuestionDetails = ({ question, classID }) => {
    
    const { dispatch } = useQuestionContext()
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [showOptions, setShowOptions] = useState(question.options.length != 0 ? true : false)


    const deleteQuestion = async () => {
        const response = await fetch("http://localhost:4000/api/questions/" + classID + "/" + question._id, {
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

    const hostQuestion = () => {
        navigate("/habram/admin", {state:{currentClassID: classID, currentQuestion: question}})
    } 
    
    return (
        <div className="question-details">
            <h4>{question?.question}</h4>
            {showOptions ? <p><strong>Options: </strong>{question?.options?.toString()}</p> : null}
            <p><strong>Answer(s): </strong>{question?.answers?.toString()}</p>
            <span onClick={deleteQuestion}>delete</span>
            <input type="submit" className="host" value="HOST" onClick={hostQuestion}/>
            <p><strong>{question?.questionType}</strong></p>
            <div>
            <input type="submit" className="edit" value= {showForm ? "Hide" : "Edit"} onClick={editQuestion}/>
            { showForm ? <UpdateQuestionForm classID={classID} question = {question} setShowForm={setShowForm} setShowOptions={setShowOptions}/> : null }
            </div>
        </div>
    )
} 

export default QuestionDetails