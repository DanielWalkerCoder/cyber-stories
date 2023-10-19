let storyObjects = []
let commentIds = []

fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(res => res.json())
    .then(storyIDs => {
        const storyPromiseArr = []
        storyIDs.length = 100
        for(let id of storyIDs){
            const request = fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            storyPromiseArr.push(request)
        }
        return Promise.all(storyPromiseArr)
    })
    .then(arrayOfResponses => {
        const requestArr = []
        for(let res of arrayOfResponses){
            requestArr.push(res.json())
        }
        // this creates the array of story objects
        return Promise.all(requestArr)
    })
    .then(data =>{
        for(obj of data){
            storyObjects.push(obj)
        }
        for(let i = 0; i < 100; i++){
            let storyTitle = data[i].title
            let storyScore = data[i].score
            let author = data[i].by
            let numOfComments = data[i].descendants
            let storyURL = data[i].url
            let newStory = document.createElement('li')
            let newLine1 = document.createElement('p')
            newLine1.innerHTML = `<a href=${storyURL}>${storyTitle}</a>`
            newLine1.className = 'line1'
            let newLine2 = document.createElement('p')
            newLine2.innerHTML = `${storyScore} points by ${author} | ${numOfComments} comments  <input type='button' value='Show Comments' class='showHide' id='button${i}'>`
            newLine2.className = 'line2'
            let commentList = document.createElement('ul')
            commentList.id = `commentList${i}`
            newStory.appendChild(newLine1)
            newStory.appendChild(newLine2)
            newStory.appendChild(commentList)
            document.querySelector('ol').appendChild(newStory)
        }
        for(let obj of data){
            if(obj.kids !== undefined){
                commentIds.push(obj.kids)
            } else{
                commentIds.push([0])
            }
            
        }
        console.log(storyObjects)
        console.log(commentIds)
        return commentIds
    })
    .then(data =>{
        for(let i = 0; i < 100; i++){
            document.querySelector(`#button${i}`).addEventListener('click', ()=>{
                showStoryComments(i)
        })
        }
        return data
    })




function showStoryComments(num){
    if(document.querySelector(`#commentList${num}`).innerHTML !== ''){
        document.querySelector(`#commentList${num}`).innerHTML = ''
        document.querySelector(`#button${num}`).value = 'Show Comments'
    } else{
        for(commentNum of commentIds[num]){
            if(commentNum === 0){
                let newLi = document.createElement('li')
                newLi.innerText = 'There are no comments yet.'
                document.querySelector(`#commentList${num}`).appendChild(newLi)
            } else{
                fetch(`https://hacker-news.firebaseio.com/v0/item/${commentNum}.json?print=pretty`)
                    .then(result => result.json())
                    .then(obj =>{
                        let newComment = document.querySelector('li')
                        newComment.innerText = `${obj.by} posted "${obj.text}"`
                        document.querySelector(`#commentList${num}`).appendChild(newComment)
                    })
            }
        }
        document.querySelector(`#button${num}`).value = 'Hide Comments'
    }
}




    // .then(commentIds =>{
    //     for(let i = 0; i < 100; i++){
    //         for(num of commentIds[i]){
    //             if(num !== 0){
    //                 getComment(num, i)
    //             }
                
    //         }
    //     }
    //     return commentIds
    // })
    // .then(data =>{
    //     console.log(data)
    //     console.log(allComments)
    // })



// function getComment(commentId, storyNum){
//     // if(commentId === 0){
//     //     let noComment = {by: 'No one has', text: 0}
//     //     allComments[storyNum].push(noComment)
//     // } else{
//         fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
//             .then(result => result.json())
//             .then(commentObj =>{
//                 allComments[storyNum].push(commentObj)
//             })
//     // }
// }






































    // .then(data =>{
    //     console.log(data)
    //     let allCommentsPromise = []
    //     for(arr of data){
    //         if(arr !== 0){
    //             for(commentID of arr)
    //             const fetchID = fetch(`https://hacker-news.firebaseio.com/v0/item/${}.json?print=pretty`)
    //         }
    //     }
    // })



    // .then(data =>{
    //     console.log(data)
    // })



    // function commentRetriever(arr){
    //     const allComments = []
    //     for(let [key, value] of Object.entries(arr)){
    //         const pushArr = []
    //         if(value !== undefined){
    //             for(let [key2, value2] of Object.entries(value)){
    //                 const request = fetch(`https://hacker-news.firebaseio.com/v0/item/${value2}.json?print=pretty`)
    //                 pushArr.push(request)
    //             }
    //         }else{
    //             pushArr.push(0)
    //         }
    //         Promise.all(pushArr)
    //         .then(arrOfCommentResponses=>{
    //             let jsonRespArr = [];
    //             for(let response of arrOfCommentResponses){
    //                 if(response !== 0){
    //                     jsonRespArr.push(response.json())
    //                 }else{
    //                     jsonRespArr.push(0)
    //                 }
    //             }
    //             return Promise.all(jsonRespArr)
    //         })
    //         .then(dataArr=>{
    //             console.log(dataArr)
    //         })
    //     }
    // }





        // create shell of comment array
    //     let allStoryAllCommentNumbers = []
    //     for(let storyObj of data){
    //         if(storyObj.kids !== undefined){
    //             allStoryAllCommentNumbers.push(storyObj.kids)
    //         } else{
    //             allStoryAllCommentNumbers.push(0)
    //         }
            
    //     }
    //     console.log(allStoryAllCommentNumbers)
    //     let allStoryAllCommentPromises = []
    //     for(let i = 0; i < 100; i++){
    //         if(allStoryAllCommentNumbers[i] !== 0){
    //             allStoryAllCommentPromises.push([])
    //         } else{
    //             allStoryAllCommentPromises.push(0)
    //         }
            
    //     }
    //     for(let i = 0; i < 100; i++){
    //         for(let commentID in allStoryAllCommentNumbers[i]){
    //             if(allStoryAllCommentNumbers[i] !== 0){
    //                 const please = fetch(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`)
    //                 allStoryAllCommentPromises[i].push(please)
    //             }
    //         }
    //     }
    //     for(let i = 0; i < 100; i++){
    //         if(allStoryAllCommentPromises !== 0){
    //             Promise.all(allStoryAllCommentPromises[i])
    //                 .then(data =>{
    //                     const arrayOfStoryComments = []
    //                     console.log(data)
    //                     for(storyComments of data){
    //                         if(storyComments !== 0){
                                
    //                             arrayOfStoryComments.push(storyComments.json())
    //                         }
    //                     }
    //                     return Promise.all(arrayOfStoryComments)
    //                 })
    //                 .then(data =>{
    //                     console.log(data)
    //                 })
    //         }
    //     }
    // })

    // .then(data =>{
    //     console.log(data)
    //     const allStoryAllCommentObj = []
    //     for(let i = 0; i < 100; i++){
    //         if(data[i] !== 0){
    //             allStoryAllCommentObj.push([])
    //         } else{
    //             allStoryAllCommentObj.push(0)
    //         }
    //     }
    //     for(let i = 0; i < 100; i++){
    //         for(let comment of data){
    //             if(data[i] !== 0){
    //                 allStoryAllCommentObj[i].push(comment.json())
    //             }
    //         }
    //     }
    //     return Promise.all(allStoryAllCommentObj)
    // })
    // .then(data =>{
    //     console.log(data)
    // })

// fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
//     .then(res => res.json())
//     .then(storyIDs => {
//         // create shell of the promise array(request array)
//         const storyPromiseArr = []
//         // limiting to 100 ids
//         storyIDs.length = 100
//         for(let id of storyIDs){
//             //this makes a promise for the given id
//             const request = fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
//             //pushes promise into the array
//             storyPromiseArr.push(request)
//         }
//         // returns an array of actual responses from API all at the same time
//         return Promise.all(storyPromiseArr)
//     })
//     .then(arrayOfResponses => {
//         const requestArr = []
//         for(let res of arrayOfResponses){
//             requestArr.push(res.json())
//         }
//         return Promise.all(requestArr)
//     })
//     .then(data =>{
//         for(let i = 0; i < 100; i++){
//             let storyTitle = data[i].title
//             let storyScore = data[i].score
//             let author = data[i].by
//             let numOfComments = data[i].descendants
//             let storyURL = data[i].url
//             let newStory = document.createElement('li')
//             let newLine1 = document.createElement('p')
//             newLine1.innerHTML = `<a href=${storyURL}>${storyTitle}</a>`
//             newLine1.className = 'line1'
//             let newLine2 = document.createElement('p')
//             newLine2.innerText = `${storyScore} points by ${author} | ${numOfComments} comments`
//             newLine2.className = 'line2'
//             newStory.appendChild(newLine1)
//             newStory.appendChild(newLine2)
//             document.querySelector('ol').appendChild(newStory)
//         }
//     })



    // for(let i = 0; i < 100; i++){
//     let storyTitle = 'That\'s what she said'
//     let storyScore = '100'
//     let author = 'd00fus'
//     let numOfComments = '64'
//     let storyURL = ''
//     fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
//         .then((data) => data.json())
//         .then((response) => {
//         return response[i]
//         })
//         .then((result) => {
//             fetch(`https://hacker-news.firebaseio.com/v0/item/${result}.json?print=pretty`)
//                 .then((data) => data.json())
//                 .then((response) => {
//                 author = response.by
//                 storyTitle = response.title
//                 storyScore = response.score
//                 numOfComments = response.descendants
//                 storyURL = response.url
//                 let newStory = document.createElement('li')
//                 let newLine1 = document.createElement('p')
//                 newLine1.innerHTML = `<a href=${storyURL}>${storyTitle}</a>`
//                 newLine1.className = 'line1'
//                 let newLine2 = document.createElement('p')
//                 newLine2.innerText = `${storyScore} points by ${author} | ${numOfComments} comments`
//                 newLine2.className = 'line2'
//                 newStory.appendChild(newLine1)
//                 newStory.appendChild(newLine2)
//                 document.querySelector('ol').appendChild(newStory)
//             })
//         })
// }