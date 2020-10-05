import React, { useContext } from "react"
import { PostContext } from "../providers/PostProvider"

const PostSearch = (props) => {

    const { setSearchTerms } = useContext(PostContext)

    return (
        <>
            Search:
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for an posts... " />
        </>
    )
}
export default PostSearch;