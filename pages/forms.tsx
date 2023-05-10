import {  FieldErrors, useForm } from "react-hook-form"

interface LoginForm {
  username:string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms(){
	const {register, watch, setError,handleSubmit,formState:{errors}} = useForm<LoginForm>({mode:'onChange'})

	const onValid = (data: LoginForm) => {
		console.log('hasd')
		setError('errors',{message:'Taken username'})
	}

	const onInvalid = (errors: FieldErrors) => {
		console.log(errors)
	}
	return (
		<form onSubmit={handleSubmit(onValid,onInvalid)}>
			<input
				{...register("username",{
					required:'Username is required',
					minLength:{
						message: 'The username should be longer than 5 chars',
						value: 5,
					}
				})}
				type="text"
				placeholder="Username" />
			{errors.username?.message}
			<input
				{...register("email",{
					required:'Email is required',
					validate:{notGmail:value => !value.includes('@gmail.com')||'Gmail is not allowed'}
				})}
				type="email"
				placeholder="Email" 
				className={`${Boolean(errors.email?.message) ?'border-red-500 border-2':''}`}
			/>
			{errors.email?.message}
			<input
				{...register("password",{required:'Password is required'})}
				type="password"
				placeholder="Password" />
			{errors.password?.message}
			<input
				type="submit"
				value="Create Account"></input>
		</form>
	)
}