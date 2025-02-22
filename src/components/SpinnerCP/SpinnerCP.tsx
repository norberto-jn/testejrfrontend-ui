import { PolymorphicBoxProps, Spinner, SpinnerOwnProps } from 'evergreen-ui'

export type SpinnerProps = PolymorphicBoxProps<'div', SpinnerOwnProps>

const SpinnerCP = (props: SpinnerOwnProps) =>{
    return(
        <Spinner size={props.size}/>
    )
}

export default SpinnerCP