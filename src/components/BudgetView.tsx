import React, { useState } from 'react';
import { ScreenView, Trip, Expense } from '../types';
import { CATEGORY_BUDGETS } from '../data/mockData';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  X,
  Tag,
  Calendar,
  Wallet
} from 'lucide-react';

interface BudgetViewProps {
  trip: Trip;
  onNavigate: (view: ScreenView) => void;
  onUpdateTripExpenses: (expenses: Expense[]) => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  trip,
  onNavigate,
  onUpdateTripExpenses,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(trip.expenses || []);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New expense form state
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<'Transportation' | 'Accommodation' | 'Food' | 'Activities' | 'Misc'>('Transportation');
  const [date, setDate] = useState('2026-09-06');

  const totalBudget = trip.estimatedBudget || 25000;
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentSpent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Compute category totals
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const categories = ['All', 'Transportation', 'Accommodation', 'Food', 'Activities', 'Misc'];

  const filteredExpenses = expenses.filter(e => {
    if (selectedCategory === 'All') return true;
    return e.category === selectedCategory;
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || typeof amount !== 'number' || amount <= 0) return;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      title: title.trim(),
      category,
      amount,
      date,
    };

    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    onUpdateTripExpenses(updated);

    // Reset Form
    setTitle('');
    setAmount('');
    setShowAddModal(false);
  };

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    onUpdateTripExpenses(updated);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => onNavigate('trip-detail')}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Itinerary
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Expense & Budget Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            For: <span className="font-semibold text-slate-700">{trip.name}</span>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          id="add-expense-btn"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Budget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Allocated Budget
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            ₹{totalBudget.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-slate-500 mt-1">Planned for 7 days</span>
        </div>

        {/* Total Spent */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Spent So Far
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {percentSpent}%
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            ₹{totalSpent.toLocaleString('en-IN')}
          </p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full ${percentSpent > 90 ? 'bg-amber-500' : 'bg-blue-600'}`}
              style={{ width: `${percentSpent}%` }}
            ></div>
          </div>
        </div>

        {/* Remaining Budget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Remaining Balance
          </span>
          <p className={`text-2xl font-bold mt-2 ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            ₹{remaining.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-slate-500 mt-1">
            {remaining < 0 ? 'Exceeded by ₹' + Math.abs(remaining).toLocaleString('en-IN') : 'Available to spend'}
          </span>
        </div>
      </div>

      {/* Category Breakdown & Insights */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Spending by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[
              { label: 'Transportation', color: 'bg-sky-500', budget: 9000 },
              { label: 'Accommodation', color: 'bg-amber-500', budget: 3060 },
              { label: 'Food', color: 'bg-rose-500', budget: 6000 },
              { label: 'Activities', color: 'bg-emerald-500', budget: 4000 },
              { label: 'Misc', color: 'bg-purple-500', budget: 2940 },
            ].map(cat => {
              const spent = categoryTotals[cat.label] || 0;
              const isOver = spent > cat.budget;
              const pct = Math.min(100, Math.round((spent / cat.budget) * 100));

              return (
                <div key={cat.label} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                      {cat.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {isOver && (
                        <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-sm">
                          Over Limit
                        </span>
                      )}
                      <span className="font-semibold text-slate-900">
                        ₹{spent.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-400">/ ₹{cat.budget.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isOver ? 'bg-amber-500' : cat.color}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/70 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Budget Advisory & Tips
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accommodation is currently at ₹5,360 vs target ₹3,060 (due to booking Taj Lake Palace). However, your Transportation and Food categories are well under limit, giving you a safe cushion of ₹3,550.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Status: On Track</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy Balance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Expense History ({filteredExpenses.length})
            </h2>
            <p className="text-xs text-slate-500">
              Every item logged for this voyage
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Expenses List */}
        {filteredExpenses.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No expenses found in this category.
          </p>
        ) : (
          <div className="space-y-2.5">
            {filteredExpenses.map(exp => (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {exp.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-medium text-slate-600">{exp.category}</span>
                      <span>•</span>
                      <span>{exp.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-900">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => handleDeleteExpense(exp.id)}
                    className="text-slate-300 hover:text-red-600 transition-colors p-1 cursor-pointer"
                    title="Delete Expense"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Log New Expense
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Udaipur Auto Fare"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="450"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                >
                  <option value="Transportation">Transportation</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Food">Food</option>
                  <option value="Activities">Activities</option>
                  <option value="Misc">Misc</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
