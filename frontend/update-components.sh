#!/bin/bash

# Update ExpenseCard.js for area tags
sed -i '115s|backgroundColor: `${color}20`,|backgroundColor: tagData?.colors?.lightHex || `${color}20`,|' /home/alex/moneymanager/frontend/components/ExpenseCard.js
sed -i '116s|color: color,|color: tagData?.colors?.darkHex || color,|' /home/alex/moneymanager/frontend/components/ExpenseCard.js

# Update ExpenseCard.js for context tags
sed -i '135s|backgroundColor: `${color}20`,|backgroundColor: tagData?.colors?.lightHex || `${color}20`,|' /home/alex/moneymanager/frontend/components/ExpenseCard.js
sed -i '136s|color: color,|color: tagData?.colors?.darkHex || color,|' /home/alex/moneymanager/frontend/components/ExpenseCard.js

# Update ExpenseDoughnutChart.js for badge styles
sed -i 's|backgroundColor: `${color}20`,|backgroundColor: cachedTag?.colors?.lightHex || `${color}20`,|' /home/alex/moneymanager/frontend/components/ExpenseDoughnutChart.js
sed -i 's|color: color|color: cachedTag?.colors?.darkHex || color|' /home/alex/moneymanager/frontend/components/ExpenseDoughnutChart.js

echo "Components updated to use new color properties!"
