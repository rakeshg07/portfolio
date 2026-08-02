# Phase 2 — Implementation Task List

## Database Expansion (Sprint 6)
- [ ] Create `Owner` model in `backend/app/models/owner.py`
- [ ] Create `Zoning` model in `backend/app/models/zoning.py`
- [ ] Create `Parcel` model in `backend/app/models/parcel.py`
- [ ] Create `DevelopmentCapacity` model in `backend/app/models/development_capacity.py`
- [ ] Create `SiteComparison` model in `backend/app/models/site_comparison.py`
- [ ] Update `backend/app/models/__init__.py` to export the new models
- [ ] Generate Alembic database migration for new tables and run it

## Services & Data Providers (Sprint 6 & 7)
- [ ] Create Mock/Data provider in `backend/app/services/parcel_data_provider.py`
- [ ] Create `ZoningService` in `backend/app/services/zoning_service.py` with capacity calculations and Suitability Score

## API Endpoints (Sprint 7)
- [ ] Create `backend/app/api/v1/parcels.py` with details, owner, zoning, capacity endpoints
- [ ] Create `backend/app/api/v1/compare.py` with site comparison endpoint
- [ ] Register new routers in `backend/app/api/v1/router.py`

## PDF Report Expansion (Sprint 8)
- [ ] Update report service `backend/app/services/report.py` to embed zoning and owner metadata in Jinja PDF templates

## Frontend UI Components (Sprint 8)
- [ ] Create `frontend/src/features/parcel/parcelApi.ts`
- [ ] Create `frontend/src/features/compare/compareApi.ts`
- [ ] Update `frontend/src/pages/MapPage.tsx` with Parcel panel
- [ ] Create `frontend/src/pages/ComparePage.tsx` side-by-side table
- [ ] Update `frontend/src/App.tsx` and layout sidebars to add `/compare` page and links

## Verification (Sprint 9)
- [ ] Add unit tests for capacity engine and API
- [ ] Verify frontend build and run tests
