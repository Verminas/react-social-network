import { useForm, SubmitHandler } from "react-hook-form"
import {useSelector} from "react-redux";
import {selectAppState} from "../../app/selectors";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";
import {isLoggedInTC} from "../../app/reducers/appReducer";
import {PATH} from "../../router/router";

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const isLoggedIn = useSelector(selectAppState).isLoggedIn;
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(isLoggedInTC(data))
  }

  if(isLoggedIn) {
    return <Navigate to={PATH.COMMON} />
  }

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