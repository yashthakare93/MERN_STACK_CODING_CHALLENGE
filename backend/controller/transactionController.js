const Transaction = require("../models/Transaction");

const listTransactions = async (req, res) => {
  try {
    const { search = '', month = '', page = 1, perPage = 10 } = req.query;

    const searchFilter = {};

    if (search) {
      const numericSearch = parseFloat(search);

      // Search filter
      if (!isNaN(numericSearch)) {
        searchFilter.$or = [
          { id: numericSearch },       
          { price: numericSearch },     
        ];
      }

      // Search filter
      searchFilter.$or = searchFilter.$or || [];
      searchFilter.$or.push(
        { title: { $regex: search, $options: 'i' } },      
        { description: { $regex: search, $options: 'i' } },  
        { category: { $regex: search, $options: 'i' } }     
      );
    }

    // Month filter
    if (month) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      const monthIndex = months.indexOf(month);
      if (monthIndex !== -1) {
        const currentYear = new Date().getFullYear();
        searchFilter.dateOfSale = {
          $gte: new Date(currentYear, monthIndex, 1),
          $lt: new Date(currentYear, monthIndex + 1, 1),
        };
      }
    }

    // Pagination and sorting
    const currentPage = Math.max(1, parseInt(page, 10));
    const itemsPerPage = Math.max(1, parseInt(perPage, 10));
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch total count and paginated data
    const totalTransactions = await Transaction.countDocuments(searchFilter); 
    const transactions = await Transaction.find(searchFilter)
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ dateOfSale: -1 })
      .select('id title description price category image sold dateOfSale');


    const formattedTransactions = transactions.map(transaction => ({
      id: transaction._id, 
      title: transaction.title,
      price: transaction.price,
      description: transaction.description,
      category: transaction.category,
      image: transaction.image,
      sold: transaction.sold,
      dateOfSale: transaction.dateOfSale,
    }));

    res.json({
      transactions: formattedTransactions,
      pagination: {
        totalTransactions,
        currentPage,
        perPage: itemsPerPage,
        totalPages: Math.ceil(totalTransactions / itemsPerPage),
      },
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { listTransactions };
