import { useForm, SubmitHandler } from "react-hook-form"
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../app/selectors";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {socialAPI} from "../../api/socialAPI";
import {getCurrentUserProfileTC} from "../../app/reducers/currentUserReducer";
import {useAppDispatch} from "../../app/store";
import {isAuthorizedAppAC} from "../../app/reducers/appReducer";

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)

    socialAPI.logIn(data).then(res => {
      console.log('response', res)
      dispatch(isAuthorizedAppAC(true))
      dispatch(getCurrentUserProfileTC(res.data.userId))
    })
  }

  // console.log(watch("example")) // watch input value by passing the name of it

  useEffect(() => {
    if(currentUser.userId) {
      navigate(`/profile/${currentUser.userId}`)
    }
  }, [currentUser.userId]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("email", {required: true})} type={"email"}/>
      {errors.email && <span>Email is required</span>}

      <input {...register("password", {required: true})} type={"password"}/>
      {errors.password && <span>Password is required</span>}

      <label>Remember me
        <input {...register("rememberMe")} type={"checkbox"}/>
      </label>

      <input type="submit"/>
    </form>
  )
}