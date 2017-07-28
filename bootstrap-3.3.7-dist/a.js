function isN(a) {
    let L=[2,3,5];
    i=0
    while(a!=1){
        if (i>2){
            return false;
        }
        if (a%L[i]==0){
            a/=L[i];
        }
        else {
            i++;
        }
    }
    return true;
}
isN(8)