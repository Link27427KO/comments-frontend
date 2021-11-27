import {Comment} from "./components/Comment";
import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, LinearProgress} from "@mui/material";
import AlertDialogSlide from "./components/AddCommentDialog";

function App() {
    const [comments, setComments] = useState([])
    const [loadingGetComments, setLoadingGetComments] = useState(false)
    const [loadingLoadMoreComments, setLoadingLoadMoreComments] = useState(false)
    const [loadingAddComment, setLoadingAddComment] = useState(false)
    let [page, setPage] = useState(0)
    const [display, setDisplay] = useState(true)
    const defaultPerPage = 3
    let [perPage, setPerPage] = useState(defaultPerPage)
    let [additionalSkip, setAdditionalSkip] = useState(0)

    const getComments = async () => {
        try {
            setLoadingGetComments(true)
            const {data} = await axios.get(`http://localhost:5000/comment?page=${page}&perPage=${perPage}&additionalSkip=${additionalSkip}`, {})
            setComments(data)
            setPage(++page)
            setLoadingGetComments(false)
        } catch (e) {
            console.log(e)
        }
    }
    const loadMore = async () => {
        try {
            setLoadingLoadMoreComments(true)
            axios.get(`http://localhost:5000/comment?page=${page}&perPage=${perPage}&additionalSkip=${additionalSkip}`, {}).then((result) => {
            setComments(comments.concat(result.data))
            if (result.data.length < perPage) {
                setDisplay(false)
            }
            setPage(++page)
            if (perPage < defaultPerPage) {
                setPerPage(defaultPerPage)
                setPage(++page)
            }
        })
        setLoadingLoadMoreComments(false)
    } catch (e) {
        console.log(e)
    }
}
const addComment = async (name, text) => {
    try {
        setLoadingAddComment(true)
        axios.post(`http://localhost:5000/comment`,
        {
            name,
                text
        }
    ).then((result) => {
            let newArray = []
            newArray.push(result.data)
            setComments(newArray.concat(comments))
            setAdditionalSkip(++additionalSkip)
        })
        setLoadingAddComment(false)

    } catch (e) {
        console.log(e)
    }
}

useEffect(() => {
    getComments()
}, [])
if(loadingGetComments || loadingLoadMoreComments || loadingAddComment){
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}
return (
    <div className="App" style={{marginLeft: 10, marginTop: 10, paddingBottom: 50}}>
        <AlertDialogSlide addComment={addComment}/>
        {
            comments.length > 0 ? comments.map((comment, index) => {
                return <div key={index}>
                    <Comment comment={comment}/>
                </div>

            }) : <p>Нет комментариев</p>
        }
        {display ?
            <Button variant="outlined" style={{display: 'block', margin: '0 auto'}} onClick={loadMore}>Load more ..
            </Button> :
            <div>
                It's all comments
            </div>
        }
    </div>
);
}

export default App;