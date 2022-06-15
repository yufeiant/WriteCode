interface handle{
    buttonWasPressed:()=>{}
}

class OffLightState implements handle{

    buttonWasPressed(): {} {
        return {};
    }

}