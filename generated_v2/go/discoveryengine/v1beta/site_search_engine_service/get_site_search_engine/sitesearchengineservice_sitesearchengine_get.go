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

// [START discoveryengine_v1beta_sitesearchengineservice_sitesearchengine_get]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// getSiteSearchEngine retrieves a SiteSearchEngine resource.
func getSiteSearchEngine(ctx context.Context, w io.Writer, projectID string, locationID string, dataStoreID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/dataStores/%s/siteSearchEngine", projectID, locationID, dataStoreID)

	client, err := discoveryengine.NewSiteSearchEngineClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSiteSearchEngineClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.GetSiteSearchEngineRequest{
		Name: name,
	}

	resp, err := client.GetSiteSearchEngine(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSiteSearchEngine failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved SiteSearchEngine: %s\n", resp.GetName())
	return nil
}

// [END discoveryengine_v1beta_sitesearchengineservice_sitesearchengine_get]
