import random

def generate_random_map(x, y):
    # Initialize an empty map
    map_data = {
        "taille": {
            "x": x,
            "y": y
        },
        "tuiles": []
    }

    # Generate random routes and intersections
    for i in range(x * y):
        tuile = {
            "id": i,
            "rue": []
        }
        # Randomly choose the number of connections (up to 4)
        num_connections = random.randint(0, 4)
        for _ in range(num_connections):
            # Randomly select a neighboring tile
            neighbor_id = random.choice(range(x * y))
            while neighbor_id == i:  # Ensure the neighbor is not the same tile
                neighbor_id = random.choice(range(x * y))
            # Add the connection
            tuile["rue"].append(neighbor_id)
        map_data["tuiles"].append(tuile)

    return map_data

# Example: Generate a random map with dimensions 3x3
random_map = generate_random_map(3, 3)
print(random_map)