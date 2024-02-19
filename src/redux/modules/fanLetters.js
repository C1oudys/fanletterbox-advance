const ADD_FAN_LETTER = "fanLetters/ADD_FAN_LETTER";
const EDIT_FAN_LETTER = "fanLetters/EDIT_FAN_LETTER";
const DELETE_FAN_LETTER = "fanLetters/DELETE_FAN_LETTER";

const initialState = {
  fanLetters: [
    {
      createdAt: "2023-11-03T02:07:09.423Z",
      nickname: "Dr. Clint Christiansen",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/36.jpg",
      content:
        "유진 이뻐요! Vitae recusandae tenetur debitis impedit ut dolorem atque reprehenderit magnam. Cum dolor magnam commodi qui perferendis. Vel temporibus soluta. Eum delectus blanditiis. Neque dicta non quod ex. Maiores aspernatur fuga reprehenderit a magni eaque fuga voluptatum hic.",
      writedTo: "유진",
      id: "1",
    },
    {
      createdAt: "2023-11-02T23:13:18.491Z",
      nickname: "Chad Graham",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/298.jpg",
      content:
        "가을 멋져요! Ipsam aspernatur nostrum eos unde velit molestiae dolorem. Tenetur ullam nostrum pariatur. Et in eos. Harum commodi ipsa quaerat aspernatur quod dignissimos quae quidem sapiente.",
      writedTo: "가을",
      id: "2",
    },
    {
      createdAt: "2023-11-02T11:25:37.026Z",
      nickname: "Tommy Abshire",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/646.jpg",
      content:
        "레이 귀여워요! Itaque nihil quae neque itaque. Non a officiis ducimus nemo consectetur. Ducimus libero voluptatum consequuntur.",
      writedTo: "레이",
      id: "3",
    },
    {
      createdAt: "2023-11-02T16:06:34.150Z",
      nickname: "Max Mayert",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/37.jpg",
      content:
        "원영 이뻐요! Sint qui eligendi repudiandae placeat maiores repudiandae assumenda repudiandae. Distinctio commodi iste. Qui architecto iusto.",
      writedTo: "원영",
      id: "4",
    },
    {
      createdAt: "2023-11-03T05:40:17.575Z",
      nickname: "Olga Christiansen",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/720.jpg",
      content:
        "리즈 멋져요! Molestiae saepe reiciendis saepe natus quo occaecati. Vel vero illum quo. Ducimus maiores porro optio illum officia nam. Cum possimus aut consequatur eaque libero ad nihil pariatur officiis.",
      writedTo: "리즈",
      id: "5",
    },
    {
      createdAt: "2023-11-03T05:40:17.575Z",
      nickname: "Olga Christiansen",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/720.jpg",
      content:
        "이서 이뻐요! Molestiae saepe reiciendis saepe natus quo occaecati. Vel vero illum quo. Ducimus maiores porro optio illum officia nam. Cum possimus aut consequatur eaque libero ad nihil pariatur officiis.",
      writedTo: "이서",
      id: "6",
    },
  ],
};

export const addFanLetter = (fanLetter) => ({
  type: ADD_FAN_LETTER,
  payload: fanLetter,
});

export const editFanLetter = (id, content) => ({
  type: EDIT_FAN_LETTER,
  payload: { id, content },
});

export const deleteFanLetter = (id) => ({
  type: DELETE_FAN_LETTER,
  payload: id,
});

const fanLettersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAN_LETTER:
      return {
        ...state,
        fanLetters: [action.payload, ...state.fanLetters],
      };
    case EDIT_FAN_LETTER:
      return {
        ...state,
        fanLetters: state.fanLetters.map((letter) =>
          letter.id === action.payload.id
            ? { ...letter, content: action.payload.content }
            : letter
        ),
      };
    case DELETE_FAN_LETTER:
      return {
        ...state,
        fanLetters: state.fanLetters.filter(
          (letter) => letter.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default fanLettersReducer;
