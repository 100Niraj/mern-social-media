import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  import CommentForm from "components/CommentForm";
  import UserCommentImage from "components/UserCommentImage";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    //const BASE_URL = useSelector((state) => state.BASE_URL);
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          // <Box mt="0.5rem">
          //   {comments.map((comment, i) => (
          //     <Box key={`${name}-${i}`}>
          //       <Divider />
          //       <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
          //         {comment}
          //       </Typography>
          //     </Box>
          //   ))}
          //   <Divider />
          // </Box>
          <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <FlexBetween sx={{ p: "0" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: "0rem 0rem 0rem 0rem",
                  }}
                >
                  <UserCommentImage
                    image={comment.picturePath}
                    alt={comment.firstName}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: "0rem 0rem 0rem 0.5rem",
                    }}
                  >
                    <Typography sx={{ p: "0.5rem 0 0 0" }}>
                      {comment.firstName}
                    </Typography>
                    {/* <Typography sx={{ ml: "3.5rem", p: "0rem 0rem 1rem 0rem" }}> */}
                    <Typography
                      color={main}
                      sx={{ p: "0.5rem 0rem 0rem 0rem" }}
                    >
                      {comment.text}
                    </Typography>
                  </Box>
                </Box>
                {/* <Typography color={main}>
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography> */}
              </FlexBetween>
            </Box>
          ))}
          <CommentForm postId={postId} />
        </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;