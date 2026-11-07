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

// [START discoveryengine_v1alpha_samplequeryservice_samplequery_delete]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// deleteSampleQuery deletes an existing sample query resource.
func deleteSampleQuery(ctx context.Context, w io.Writer, projectID string, locationID string, sampleQuerySetID string, sampleQueryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/sampleQuerySets/%s/sampleQueries/%s", projectID, locationID, sampleQuerySetID, sampleQueryID)

	client, err := discoveryengine.NewSampleQueryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSampleQueryClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.DeleteSampleQueryRequest{
		Name: name,
	}

	if err := client.DeleteSampleQuery(ctx, req); err != nil {
		return fmt.Errorf("DeleteSampleQuery failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted sample query: %s\n", name)

	return nil
}

// [END discoveryengine_v1alpha_samplequeryservice_samplequery_delete]
