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

// [START discoveryengine_v1beta_samplequerysetservice_samplequeryset_get]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// getSampleQuerySet retrieves a sample query set resource.
func getSampleQuerySet(ctx context.Context, w io.Writer, projectID string, locationID string, sampleQuerySetID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/sampleQuerySets/%s", projectID, locationID, sampleQuerySetID)

	client, err := discoveryengine.NewSampleQuerySetClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSampleQuerySetClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.GetSampleQuerySetRequest{
		Name: name,
	}

	resp, err := client.GetSampleQuerySet(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSampleQuerySet: %w", err)
	}

	fmt.Fprintf(w, "Retrieved sample query set: %s\n", resp.GetName())

	return nil
}

// [END discoveryengine_v1beta_samplequerysetservice_samplequeryset_get]
