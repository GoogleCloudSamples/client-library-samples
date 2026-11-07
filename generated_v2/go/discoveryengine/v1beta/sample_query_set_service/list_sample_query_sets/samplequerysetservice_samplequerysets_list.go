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

// [START discoveryengine_v1beta_samplequerysetservice_samplequerysets_list]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listSampleQuerySets retrieves all sample query sets for a project and location.
func listSampleQuerySets(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-discoveryengine.googleapis.com:443", locationID)))
	}

	// Discovery Engine requires the REST client because gRPC is not supported for this service.
	client, err := discoveryengine.NewSampleQuerySetRESTClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSampleQuerySetRESTClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ListSampleQuerySetsRequest{
		Parent: parent,
	}

	it := client.ListSampleQuerySets(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListSampleQuerySets: %w", err)
		}
		fmt.Fprintf(w, "Sample query set: %s\n", resp.GetName())
	}

	return nil
}

// [END discoveryengine_v1beta_samplequerysetservice_samplequerysets_list]
