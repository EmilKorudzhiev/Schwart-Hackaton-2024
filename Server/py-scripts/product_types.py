import csv


def extract_unique_values_from_second_column(csv_file_path, encoding='utf-8'):
    unique_values = set()

    with open(csv_file_path, mode='r', newline='', encoding=encoding) as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)  # Skip the header row if there is one

        for row in csv_reader:
            if len(row) > 1:
                unique_values.add(row[1])

    return unique_values


# Example usage
csv_file_path = 'D:\Downloads\product_master_data.csv'
unique_values = extract_unique_values_from_second_column(csv_file_path, encoding='utf-8')
print("Unique values from the second column:", unique_values)
print(len(unique_values))
