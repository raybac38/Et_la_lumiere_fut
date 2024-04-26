def process_file(file_name):
    # Initialize variables to store the first two lines
    x = None
    y = None

    li_fau=[]
    
    # Open the file and read the first two lines
    with open(file_name, 'r') as file:
        x = file.readline().strip()  # Read the first line and remove leading/trailing whitespace
        y = file.readline().strip()  # Read the second line and remove leading/trailing whitespace
    
    # Initialize variables to store the positions of the first "#" in each line
    first_hash_x = None
    first_hash_y = None
    x=int(x)
    

    # Open the file again to search for the first "#"
    with open(file_name, 'r') as file:
        # Skip the first two lines
        next(file)
        next(file)

        i=0
        j=0
        for line in file:
            
            i=i+1
        # Iterate over each character in the line
            for char in line:
                
                
                if char != '\n':
                    


                    print(char)
                    j=j% 5 +1

                    print(j,i)
                    max=2*x +1
                    if char == '#':
                        for lo in range(max):
                            
                            if (lo+1) != j:

                                li_fau.append([lo+1,i])



                        

                        print("print the first one,with x= %d and y= %d" % (j, i))
                        print(li_fau)
                    

        
    return x, y

# Example usage
file_name = "teste_1.txt"  # Change this to the path of your file
x, y = process_file(file_name)
print("x:", x)
print("y:", y)

