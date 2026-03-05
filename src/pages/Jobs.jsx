import { useState, useMemo } from 'react'
import { Search, MapPin, Briefcase, DollarSign, Clock, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { jobs, jobTypes, jobIndustries, jobLocations } from '../data/jobs'
import { cn } from '../lib/utils'

const ITEMS_PER_PAGE = 6

function JobCard({ job }) {
  return (
    <div className={cn(
      'bg-white border p-6 hover:shadow-md transition-all duration-300 group cursor-pointer',
      job.featured ? 'border-gold-400 border-l-4' : 'border-cream-200'
    )}>
      {job.featured && (
        <span className="inline-block text-[10px] font-600 uppercase tracking-widest text-gold-600 bg-gold-500/10 px-2 py-0.5 mb-3">
          Featured
        </span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display text-xl text-forest-900 group-hover:text-forest-700 transition-colors mb-1">{job.title}</h3>
          <p className="text-sm font-500 text-forest-700 mb-3">{job.company}</p>
          <div className="flex flex-wrap gap-3 text-xs text-forest-600">
            <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
            <span className="flex items-center gap-1"><Briefcase size={11} />{job.type}</span>
            <span className="flex items-center gap-1"><DollarSign size={11} />{job.salary}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{job.posted}</span>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-3">
          <span className="text-[10px] uppercase tracking-wider text-white bg-forest-700 px-2 py-1">{job.industry}</span>
          <ChevronRight size={18} className="text-gold-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-cream-100">
        <button className="text-xs text-gold-600 font-500 hover:text-gold-700 transition-colors">Apply Now →</button>
      </div>
    </div>
  )
}

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All Types')
  const [filterIndustry, setFilterIndustry] = useState('All Industries')
  const [filterLocation, setFilterLocation] = useState('All Locations')
  const [page, setPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch = search === '' || 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
      const matchType = filterType === 'All Types' || job.type === filterType
      const matchIndustry = filterIndustry === 'All Industries' || job.industry === filterIndustry
      const matchLocation = filterLocation === 'All Locations' || job.location === filterLocation
      return matchSearch && matchType && matchIndustry && matchLocation
    })
  }, [search, filterType, filterIndustry, filterLocation])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const resetFilters = () => {
    setSearch('')
    setFilterType('All Types')
    setFilterIndustry('All Industries')
    setFilterLocation('All Locations')
    setPage(1)
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-forest-950 pt-32 pb-12">
        <div className="container-main">
          <p className="label-tag">Open Positions</p>
          <h1 className="heading-xl text-cream-100 mb-4">Find Your Next Role</h1>
          <p className="text-cream-300 max-w-xl">Browse opportunities curated by our team of industry-specialist recruiters.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-forest-900 py-5 sticky top-16 z-30">
        <div className="container-main">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-300" />
              <input
                type="text"
                placeholder="Search by title or company..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full bg-forest-800 border border-forest-700 text-cream-100 placeholder:text-cream-300/50 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden flex items-center gap-2 bg-forest-800 border border-forest-700 text-cream-100 px-4 py-2.5 text-sm"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="bg-cream-100 min-h-screen">
        <div className="container-main py-10">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={cn(
              'shrink-0 w-60 space-y-7',
              'hidden md:block',
              sidebarOpen && '!block fixed inset-0 z-40 bg-white p-6 overflow-auto md:relative md:z-auto'
            )}>
              {sidebarOpen && (
                <button onClick={() => setSidebarOpen(false)} className="md:hidden text-sm text-forest-700 mb-4">← Close</button>
              )}
              <div>
                <h4 className="text-xs font-600 uppercase tracking-widest text-forest-700 mb-3">Job Type</h4>
                <div className="space-y-2">
                  {jobTypes.map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="type"
                        checked={filterType === t}
                        onChange={() => { setFilterType(t); setPage(1) }}
                        className="accent-forest-800"
                      />
                      <span className={cn('text-sm', filterType === t ? 'text-forest-900 font-500' : 'text-forest-600 group-hover:text-forest-900')}>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-600 uppercase tracking-widest text-forest-700 mb-3">Industry</h4>
                <div className="space-y-2">
                  {jobIndustries.map((ind) => (
                    <label key={ind} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="industry"
                        checked={filterIndustry === ind}
                        onChange={() => { setFilterIndustry(ind); setPage(1) }}
                        className="accent-forest-800"
                      />
                      <span className={cn('text-sm', filterIndustry === ind ? 'text-forest-900 font-500' : 'text-forest-600 group-hover:text-forest-900')}>{ind}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-600 uppercase tracking-widest text-forest-700 mb-3">Location</h4>
                <select
                  value={filterLocation}
                  onChange={(e) => { setFilterLocation(e.target.value); setPage(1) }}
                  className="w-full border border-cream-200 bg-white text-forest-800 text-sm px-3 py-2 focus:outline-none focus:border-forest-600"
                >
                  {jobLocations.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <button onClick={resetFilters} className="text-xs text-gold-600 underline underline-offset-2 hover:text-gold-700">
                Reset all filters
              </button>
            </aside>

            {/* Job Listings */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-forest-600">
                  Showing <span className="font-500 text-forest-900">{filtered.length}</span> positions
                </p>
              </div>

              {paginated.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-2xl text-forest-700 mb-2">No results found</p>
                  <p className="text-forest-500 text-sm mb-4">Try adjusting your filters or search terms.</p>
                  <button onClick={resetFilters} className="btn-outline text-sm">Clear Filters</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginated.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={cn(
                        'w-9 h-9 text-sm font-500 transition-colors',
                        page === i + 1
                          ? 'bg-forest-900 text-cream-100'
                          : 'bg-white border border-cream-200 text-forest-700 hover:border-forest-600'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
