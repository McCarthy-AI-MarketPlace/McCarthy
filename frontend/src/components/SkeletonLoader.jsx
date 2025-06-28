import React from "react";
import Skeleton from "react-loading-skeleton";
import { Row, Col, Container } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";

// HERO SECTION
const HeroSkeleton = () => (
  <section
    className="py-5 text-center d-flex align-items-center"
    style={{
      background: "linear-gradient(180deg, #e8e2fb 30%, #dfe7fb 100%)",
      minHeight: "70vh",
      paddingTop: "8vh",
    }}
  >
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Skeleton height={60} width="80%" className="mb-3" />
          <Skeleton height={25} width="60%" className="mb-4" />
          <Skeleton height={48} width="100%" className="mb-2 rounded-pill" />
          <Skeleton height={48} width="100%" className="mb-4 rounded-pill" />
          <div className="d-flex justify-content-center gap-3 mt-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} circle width={50} height={50} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

// HOW SECTION
const HowSkeleton = () => (
  <Container className="text-center my-5 py-5">
    <Skeleton height={36} width="40%" className="mb-2 mx-auto" />
    <Skeleton height={20} width="60%" className="mb-4 mx-auto" />

    <Row className="justify-content-center">
      {[...Array(3)].map((_, idx) => (
        <Col md={4} className="mb-4" key={idx}>
          <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
            <Skeleton circle height={50} width={50} className="mb-3 mx-auto" />
            <Skeleton height={20} width="70%" className="mb-2 mx-auto" />
            <Skeleton height={16} width="85%" className="mx-auto" />
          </div>
        </Col>
      ))}
    </Row>
  </Container>
);

// TRENDING TOOLS SECTION
const TrendingToolsSkeleton = () => (
  <section style={{ backgroundColor: "#eeebfc" }}>
    <Container className="my-5 py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Skeleton height={30} width="30%" />
        <Skeleton height={20} width="15%" />
      </div>

      <Row xs={1} md={3} className="g-4">
        {[...Array(6)].map((_, idx) => (
          <Col key={idx}>
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div className="d-flex align-items-center mb-3 gap-3">
                <Skeleton circle height={40} width={40} />
                <Skeleton height={20} width="60%" />
              </div>
              <Skeleton height={16} width="100%" className="mb-3" />
              <Skeleton height={16} width="95%" className="mb-2" />
              <div className="d-flex gap-2 flex-wrap mb-3">
                {[...Array(3)].map((__, i) => (
                  <Skeleton
                    key={i}
                    height={20}
                    width={60}
                    className="rounded-pill"
                  />
                ))}
              </div>
              <div className="d-flex justify-content-between">
                <Skeleton height={35} width={100} className="rounded-pill" />
                <Skeleton circle height={35} width={35} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

// CATEGORIES SECTION
const CategoriesSkeleton = () => (
  <Container className="my-5 py-5 text-center">
    <Skeleton height={36} width="35%" className="mb-3 mx-auto" />
    <Skeleton height={20} width="60%" className="mb-5 mx-auto" />

    <Row className="justify-content-center g-4">
      {[...Array(6)].map((_, idx) => (
        <Col xs={6} sm={4} lg={2} key={idx}>
          <div className="card h-100 border-0 shadow-sm rounded-4 p-3">
            <Skeleton circle width={40} height={40} className="mb-3 mx-auto" />
            <Skeleton height={16} width="70%" className="mx-auto mb-2" />
            <Skeleton height={14} width="50%" className="mx-auto" />
          </div>
        </Col>
      ))}
    </Row>
  </Container>
);

// WHY SECTION
const WhySkeleton = () => (
  <section style={{ backgroundColor: "#eeebfc" }}>
    <Container className="my-5 py-5 text-center">
      <Skeleton height={36} width="40%" className="mb-3 mx-auto" />
      <Skeleton height={20} width="60%" className="mb-5 mx-auto" />

      <Row className="justify-content-center g-4">
        {[...Array(4)].map((_, idx) => (
          <Col md={3} key={idx}>
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
              <Skeleton height={24} width="70%" className="mb-2 mx-auto" />
              <Skeleton height={14} width="90%" className="mx-auto" />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

// CTA SECTION
const CTASkeleton = () => (
  <div style={{ padding: "0 4rem 4rem" }}>
    <div
      style={{
        borderRadius: "1.2rem",
        minHeight: "40vh",
        background: "linear-gradient(90deg, #7b2ff7 0%, #4facfe 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: 40,
      }}
    >
      <Container>
        <Skeleton height={36} width="60%" className="mb-3 mx-auto" />
        <Skeleton height={20} width="70%" className="mb-4 mx-auto" />
        <Skeleton height={40} width={120} className="rounded-pill mx-auto" />
      </Container>
    </div>
  </div>
);

const SkeletonLoader = () => (
  <div>
    <HeroSkeleton />
    <HowSkeleton />
    <TrendingToolsSkeleton />
    <CategoriesSkeleton />
    <WhySkeleton />
    <CTASkeleton />
  </div>
);

export default SkeletonLoader;