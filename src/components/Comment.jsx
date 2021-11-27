import {Card, CardContent, Typography} from "@mui/material";

export const Comment = (props) => {
    const {comment} = props
    const normalizeDate = (date) => {
        const data = new Date(date)
        let hours = data.getHours()
        let minutes = data.getMinutes()
        if(hours < 10){
            hours = `0${hours}`
        }
        if(minutes < 10){
            minutes = `0${minutes}`
        }
        return `${hours}:${minutes}`
    }
    return (
        <>
            <Card style={{marginBottom: 10}} variant="outlined" sx={{minWidth: 275, maxWidth: 275}}>
                <CardContent>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div><Typography sx={{mb: 1.5}} color="text.secondary">
                            {comment.name}
                        </Typography>
                        </div>
                        <div>{normalizeDate(comment.createdDate)}</div>
                    </div>
                    <Typography variant="body2">
                        {comment.text}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}