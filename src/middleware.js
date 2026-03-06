import { NextResponse } from "next/server"

export function middleware(request){

const protectedRoutes = [
"/dashboard",
"/add-expense"
]

const url = request.nextUrl.pathname

if(protectedRoutes.includes(url)){

const token =
request.cookies.get("sb-access-token")

if(!token){

return NextResponse.redirect(
new URL("/login",request.url)
)

}

}

return NextResponse.next()

}
