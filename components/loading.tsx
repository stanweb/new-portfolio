import {Spinner} from "@/components/ui/spinner";

interface LoadingProps {
    message: string;
}
export function Loading ( {message} :LoadingProps) {

    return(<div className="flex flex-col items-center justify-center h-[20vh]">
        <Spinner className={'animate-spin h-10 w-10 text-primary'}/>
        <div className="text-center my-6"> {message}</div>

    </div>)


}