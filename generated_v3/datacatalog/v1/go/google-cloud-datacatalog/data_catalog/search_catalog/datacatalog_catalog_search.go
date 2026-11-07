// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START datacatalog_v1_datacatalog_catalog_search]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	datacatalog "cloud.google.com/go/datacatalog/apiv1"
	datacatalogpb "cloud.google.com/go/datacatalog/apiv1/datacatalogpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// searchCatalog searches Data Catalog resources matching a query.
func searchCatalog(ctx context.Context, w io.Writer) error {
	var opts []option.ClientOption
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCLOUD_PROJECT")
	}
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := datacatalog.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("datacatalog.NewClient: %w", err)
	}
	defer client.Close()

	scope := &datacatalogpb.SearchCatalogRequest_Scope{
		IncludeGcpPublicDatasets: true,
	}
	if projectID != "" {
		scope.IncludeProjectIds = []string{projectID}
	}

	req := &datacatalogpb.SearchCatalogRequest{
		Scope: scope,
		Query: "type=dataset",
	}

	it := client.SearchCatalog(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			if strings.Contains(err.Error(), "SERVICE_DISABLED") {
				fmt.Fprintf(w, "Data Catalog API is not enabled: %v\n", err)
				return nil
			}
			return fmt.Errorf("SearchCatalog iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Result type: %s, Resource name: %s\n", resp.GetSearchResultSubtype(), resp.GetRelativeResourceName())
	}

	return nil
}

// [END datacatalog_v1_datacatalog_catalog_search]
